import { storage } from '@/App';
import { callGraphql } from '@/services/graphql/graphql';
import { LOGIN_MUTATION_STRING } from '@/services/graphql/graphqlString/login';
import { z } from 'zod';

export const authResponseSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  user: z.any(),
});

export type AuthResponseSchema = z.infer<typeof authResponseSchema>;

function isAuthenticated(): boolean | undefined {
  return storage.getBoolean('isAuthenticated');
}
async function login(username: string, password: string) {
  const response = await callGraphql(
    LOGIN_MUTATION_STRING,
    {
      authInput: {
        password,
        username,
      },
    },
    'login',
  );
  saveAuthInfo(response);
  return response;
}

function saveAuthInfo(response: any) {
  const { access_token, refresh_token, user } =
    authResponseSchema.parse(response);
  storage.set('isAuthenticated', true);
  storage.set('accessToken', access_token);
  storage.set('refreshToken', refresh_token);
  storage.set('user', JSON.stringify(user));
}

export const AuthServices = {
  isAuthenticated,
  login,
  saveAuthInfo,
};
