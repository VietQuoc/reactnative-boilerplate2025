import { z } from 'zod';
import * as Yup from 'yup';
import { TFunction } from 'i18next';

export const loginResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
});
export type LoginResponseSchema = z.infer<typeof loginResponseSchema>;

export const getLoginSchema = (t: TFunction) => {
  return Yup.object().shape({
    username: Yup.string().required(t('screen_login.username_required')),
    password: Yup.string()
      .min(6, t('screen_login.password_minimum'))
      .required(t('screen_login.password_required')),
  });
};
