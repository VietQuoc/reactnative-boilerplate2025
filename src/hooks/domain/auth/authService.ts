import { instance } from '@/services/instance';
import { storage } from '@/App';
import { isAuthenticatedShema } from './schema';

export const AuthServices = {
  isAuthenticated: (): boolean | undefined => {
    return storage.getBoolean('isAuthenticated');
  },
  login: () => {},
};
