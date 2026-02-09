import { z } from 'zod';

const nameRegex = /^[A-Za-zА-Яа-яЁё]+$/;

export const createUserSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Za-z]/, 'Password must contain at least one letter')
    .regex(/\d/, 'Password must contain at least one number'),

  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .regex(nameRegex, 'First name can contain only letters'),

  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .regex(nameRegex, 'Last name can contain only letters'),

  departmentId: z.string().optional(),
  positionId: z.string().optional(),
  
  role: z.enum(['Admin', 'Employee']),
});