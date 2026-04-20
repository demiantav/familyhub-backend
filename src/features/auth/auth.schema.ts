import { z } from 'zod';

const AdminRegisterSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  familyName: z.string().min(3, 'Family name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const AdminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

const MemberLoginSchema = z.object({
  accessCode: z.string().length(6, 'Access code must be exactly 6 characters long'),
  name: z.string().min(2, 'Name is required'),
  pin: z
    .string()
    .length(4, 'PIN must be exactly 4 digits')
    .regex(/^\d+$/, 'PIN must contain only numbers'),
});

export type AdminRegisterInput = z.infer<typeof AdminRegisterSchema>;
export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;
export type MemberLoginInput = z.infer<typeof MemberLoginSchema>;

export { AdminRegisterSchema, AdminLoginSchema, MemberLoginSchema };
