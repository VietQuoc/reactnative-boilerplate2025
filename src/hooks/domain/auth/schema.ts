import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
  enabled: z.boolean(),
});
export type LoginSchema = z.infer<typeof loginSchema>;

export const isAuthenticatedShema = z.boolean;
