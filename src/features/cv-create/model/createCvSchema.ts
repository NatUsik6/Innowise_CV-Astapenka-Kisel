import { z } from 'zod';

export const createCvSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  education: z.string().optional(),
  description: z.string().optional(),
});

export type CreateCvFormValues = z.infer<typeof createCvSchema>;