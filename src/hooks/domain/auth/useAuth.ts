import { useEffect } from 'react';
import { LOGIN_MUTATION_STRING } from '@/services/graphql/graphqlString/login';
import { useMutation } from '@apollo/client';
import { storage } from '@/App';
import { loginResponseSchema } from './schema';
import usePopup from '@/theme/hooks/usePopup';
import { useNavigation } from '@react-navigation/core';
import { Paths } from '@/navigation/paths';

export const useLogin = () => {
  const { showPopup } = usePopup();
  const navigation: any = useNavigation();
  const [mutateFunction, { data, loading, error }] = useMutation(
    LOGIN_MUTATION_STRING,
  );

  useEffect(() => {
    if (data) {
      const { refresh_token, access_token } = loginResponseSchema.parse(
        data?.login,
      );
      storage.set('accessToken', access_token);
      storage.set('refreshToken', refresh_token);
      navigation.reset({
        index: 0,
        routes: [{ name: Paths.Home }],
      });
    }
    if (error) {
      showPopup(error.message, () => {});
    }
  }, [data, error]);

  return { mutateFunction, data, loading, error };
};
