import { z } from 'zod';

export const userSchema = z.object({
  id: z.number(),
  address: z.string(),
  avatarUrl: z.string(),
  displayName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
});

export type User = z.infer<typeof userSchema>;
