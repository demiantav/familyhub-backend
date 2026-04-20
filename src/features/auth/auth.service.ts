import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { prisma } from '../../shared/prisma.js';
import { env } from '../../core/config/env.js';
import { AdminRegisterInput } from './auth.schema.js';

// Helper para el código de familia (6 chars alfanuméricos)
const generateAccessCode = () => Math.random().toString(36).substring(2, 8).toUpperCase();

export const authService = {
  async registerAdmin(data: AdminRegisterInput) {
    // 1. Verificar si el email ya existe
    const existingAdmin = await prisma.member.findUnique({ where: { email: data.email } });
    if (existingAdmin) throw new Error('Email already in use');

    // 2. Preparar datos
    const accessCode = generateAccessCode();
    const passwordHash = await argon2.hash(data.password);

    // 3. Transacción Atómica (Family + Admin Member)
    return await prisma.$transaction(async (tx) => {
      const family = await tx.family.create({
        data: { name: data.familyName, accessCode },
      });

      const admin = await tx.member.create({
        data: {
          familyId: family.id,
          name: data.name,
          email: data.email,
          passwordHash,
          role: 'ADMIN',
        },
      });

      // 4. Generar Token
      const token = jwt.sign(
        { memberId: admin.id, familyId: family.id, role: admin.role },
        env.JWT_SECRET,
        { expiresIn: '7d' },
      );

      return { admin: { id: admin.id, name: admin.name, email: admin.email }, family, token };
    });
  },
};
