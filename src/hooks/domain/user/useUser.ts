import { useQuery, useQueryClient } from '@tanstack/react-query';

import { UserServices } from './userService';

const enum UserQueryKey {
  fetchCurrent = 'fetchCurrentUser',
}

const useFetchCurrentUserQuery = () =>
  useQuery({
    enabled: true,
    queryFn: () => UserServices.fetchCurrentUser(),
    queryKey: [UserQueryKey.fetchCurrent],
  });

export const useUser = () => {
  const client = useQueryClient();

  const invalidateQuery = (queryKeys: UserQueryKey[]) =>
    client.invalidateQueries({
      queryKey: queryKeys,
    });

  return {
    invalidateQuery,
    useFetchCurrentUserQuery,
  };
};
