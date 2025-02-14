import { storage } from '@/App';
import { instance } from '../instance';
import { ResponseSchema } from './type';
import { get } from 'lodash';

export const LOGIN_MUTATION = `
  mutation Login($authInput: AuthInput!) {
    login(authInput: $authInput) {
        access_token
        refresh_token
        user {
          id
          address
          avatarUrl
          displayName
          email
          phoneNumber
          role
        }
    }
  }
`;
export const REFRESH_TOKEN = `
mutation RefreshToken($authInput: RefreshTokenInput!) {
  refreshToken(authInput: $authInput) {
    access_token
    refresh_token
    user {
      id
    }
  }
}`;
export const USER_MUTATION = `
query User {
  user {
    id
    address
    avatarUrl
    createdAt
    displayName
    role
    email
    phoneNumber
    username
    updatedAt
  }
}`;

export const callGraphql = async (
  query: string,
  variables: object,
  dataObject: string = '',
  headers: any = undefined,
  isAuthenticatedRequest: boolean = false,
) => {
  try {
    let postCall = await instance.post('graphql', {
      headers: headers ?? [],
      json: { query, variables },
    });

    let response: ResponseSchema = await postCall.json();

    if (response.errors) {
      if (isAuthenticatedRequest && response.errors[0].message === 'Expired') {
        const accessToken = await refreshToken();

        const newHeaders = {
          ...headers,
          Authorization: 'Bearer ' + accessToken,
        };

        postCall = await instance.post('graphql', {
          headers: newHeaders,
          json: { query, variables },
        });
        response = await postCall.json();
      } else throw new Error(response.errors[0].message);
    }
    return get(response.data, dataObject);
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

async function refreshToken(): Promise<string> {
  try {
    const data = await callGraphql(
      REFRESH_TOKEN,
      {
        authInput: {
          refresh_token: storage.getString('refreshToken'),
        },
      },
      'refreshToken',
    );

    storage.set('accessToken', data?.access_token);
    storage.set('refreshToken', data?.refresh_token);
    return data?.access_token;
  } catch (error) {
    throw new Error('Refresh token failed');
  }
}
