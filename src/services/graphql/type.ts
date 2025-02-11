import { userSchema } from '@/hooks/domain/user/schema';
import { z } from 'zod';

export const loginDataSchema = z.object({
  data: z.object({
    login: z.object({
      access_token: z.string(),
      user: userSchema,
    }),
  }),
});

export type LoginData = z.infer<typeof loginDataSchema>;
export type ResponseSchema = {
  data: object | null;
  errors: Array<any>;
};
