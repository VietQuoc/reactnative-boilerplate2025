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
export const getRegisterSchema = (t: TFunction) => {
  const phoneRegExp = /^0\d{9}$/;
  return Yup.object().shape({
    email: Yup.string()
      .required(t('screen_register.email_invalid'))
      .email(t('screen_register.email_invalid')),
    username: Yup.string().required(t('screen_register.username_required')),
    password: Yup.string()
      .min(6, t('screen_register.password_minimum'))
      .required(t('screen_register.password_required'))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        'Mật khẩu phải có ít nhất 1 chữ cái thường, 1 chữ cái hoa, 1 số và 1 ký tự đặc biệt',
      ),
    displayName: Yup.string().required(
      t('screen_register.display_name_required'),
    ),
    phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    avatar: Yup.mixed()
      .required(t('screen_register.avatar_required'))
      .test(
        'fileSize',
        t('screen_register.avatar_size_validate', { size: '10MB' }),
        (value: any) => {
          console.log('avatar', value);
          if (!value) return true;
          return value.fileSize <= 10 * 1024 * 1024;
        },
      ),
  });
};
