import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { prisma } from '../../shared/prisma.js';
import { env } from '../../core/config/env.js';
import {
  AdminRegisterInput,
  AdminLoginInput,
  MemberRegisterInput,
  GetFamilyMembersInput,
} from './auth.schema.js';

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

  async loginAdmin(data: AdminLoginInput) {
    // 1. Verificar si el email existe
    const admin = await prisma.member.findUnique({ where: { email: data.email } });
    if (!admin || !admin.passwordHash) throw new Error('Invalid credentials');

    const isPasswordValid = await argon2.verify(admin.passwordHash, data.password);
    if (!isPasswordValid) throw new Error('Invalid credentials');

    // 2. Generar Token
    const token = jwt.sign(
      { memberId: admin.id, familyId: admin.familyId, role: admin.role },
      env.JWT_SECRET,
      { expiresIn: '7d' },
    );

    return { admin: { id: admin.id, name: admin.name, email: admin.email }, token };
  },

  async registerMember(data: MemberRegisterInput, familyId: string) {
    // 1. Verificar si el familyId existe
    const family = await prisma.family.findUnique({ where: { id: familyId } });
    if (!family) throw new Error('Family not found');

    const checkNameExists = await prisma.member.findFirst({
      where: {
        familyId,
        name: data.name,
      },
    });
    if (checkNameExists) throw new Error('Name already in use in this family');

    const pinHash = await argon2.hash(data.pin);

    const member = await prisma.member.create({
      data: {
        familyId,
        name: data.name,
        avatarKey: data.avatarKey,
        pinHash,
        role: 'CHILD',
      },
    });

    return { member: { id: member.id, name: member.name, avatarKey: member.avatarKey } };
  },

  async getMembers(data: GetFamilyMembersInput) {
    const family = await prisma.family.findUnique({
      where: { accessCode: data.accessCode },
      select: {
        id: true,
        name: true,
        members: { select: { id: true, name: true, avatarKey: true, role: true } },
      },
    });

    if (!family) throw new Error('Family not found');

    return { family: { id: family.id, name: family.name, members: family.members } };
  },
};
