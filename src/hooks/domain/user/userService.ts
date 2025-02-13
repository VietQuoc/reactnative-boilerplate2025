import { storage } from '@/App';
import { callGraphql, USER_MUTATION } from '@/services/graphql/graphql';

export const UserServices = {
  fetchCurrentUser: async () => {
    const accessToken = storage.getString('accessToken');
    if (accessToken) {
      const response = await callGraphql(
        USER_MUTATION,
        {},
        'user',
        {
          Authorization: 'Bearer ' + accessToken,
        },
        true,
      );
      console.log('fetchCurrentUser', response);

      return response;
    } else {
      throw new Error('Still not logged in!');
    }
  },
};
