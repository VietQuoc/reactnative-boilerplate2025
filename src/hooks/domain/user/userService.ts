import { storage } from '@/App';
import { callGraphql } from '@/services/graphql/graphql';
import { USER_MUTATION_STRING } from '@/services/graphql/graphqlString/user';

export const UserServices = {
  fetchCurrentUser: async () => {
    const accessToken = storage.getString('accessToken');
    if (accessToken) {
      const response = await callGraphql(
        USER_MUTATION_STRING,
        {},
        'user',
        {
          Authorization: 'Bearer ' + accessToken,
        },
        true,
      );

      return response;
    } else {
      throw new Error('Still not logged in!');
    }
  },
};
