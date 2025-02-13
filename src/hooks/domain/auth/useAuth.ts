import { loginSchema, LoginSchema } from './schema';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AuthServices } from './authService';

const enum AuthQueryKey {
  login = 'login',
}

export const useLoginquery = (input: LoginSchema): UseQueryResult => {
  const { username, password, enabled } = loginSchema.parse(input);
  return useQuery({
    enabled: enabled,
    queryFn: () => AuthServices.login(username, password),
    queryKey: [AuthQueryKey.login, username],
  });
};
