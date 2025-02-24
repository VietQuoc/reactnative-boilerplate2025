import { useEffect } from 'react';
import { LOGIN_MUTATION_STRING } from '@/services/graphql/graphqlString/login';
import { useMutation } from '@apollo/client';
import { storage } from '@/App';
import { loginResponseSchema } from './schema';
import usePopup from '@/theme/hooks/usePopup';
import { useNavigation } from '@react-navigation/core';
import { Paths } from '@/navigation/paths';
import { REGISTER_MUTATION_STRING } from '@/services/graphql/graphqlString/register';
import { ApolloError } from '@apollo/client';

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

export const useRegister = () => {
  const { showPopup } = usePopup();
  const navigation: any = useNavigation();
  const [mutateFunction, { data, loading, error }] = useMutation(
    REGISTER_MUTATION_STRING,
  );

  useEffect(() => {
    if (data) {
      const { refresh_token, access_token } = loginResponseSchema.parse(
        data?.register,
      );
      storage.set('accessToken', access_token);
      storage.set('refreshToken', refresh_token);
      navigation.reset({
        index: 0,
        routes: [{ name: Paths.Home }],
      });
    }
    if (error) {
      if (error instanceof ApolloError) {
        if (error.networkError) {
          const serverError = error.networkError;
          console.log((serverError as any).result.errors[0].message);
          showPopup((serverError as any).result.errors[0].message, () => {});
        } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
          console.log('GraphQL errors:', error.graphQLErrors);
          showPopup(error.graphQLErrors[0].message, () => {});
        }
      } else {
        showPopup((error as any).message, () => {});
      }
    }
  }, [data, error]);

  return { mutateFunction, data, loading, error };
};
