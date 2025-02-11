import { instance } from '@/services/instance';
import { storage } from '@/App';
import { isAuthenticatedShema } from './schema';
import { callGraphql, LOGIN_MUTATION } from '@/services/graphql/graphql';

export const AuthServices = {
  isAuthenticated: (): boolean | undefined => {
    return storage.getBoolean('isAuthenticated');
  },
  login: async (username: string, password: string): Promise<string> => {
    const response = await callGraphql(LOGIN_MUTATION, {
      authInput: {
        password,
        username,
      },
    });
    const token = response?.login?.access_token;
    if (token) {
      storage.set('isAuthenticated', true);
      storage.set('userToken', token);
      storage.set('user', JSON.stringify(response?.login?.user));
    }
    return response.login.access_token;
  },
};
