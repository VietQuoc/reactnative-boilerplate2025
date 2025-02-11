import { ZodError } from 'zod';
import { instance } from '../instance';
import { LoginData, loginDataSchema, ResponseSchema } from './type';

export const LOGIN_MUTATION = `
  mutation Login($authInput: AuthInput!) {
    login(authInput: $authInput) {
        access_token
        user {
          address
          avatarUrl
          displayName
          email
          phoneNumber
        }
    }
  }
`;

export const callGraphql = async (
  query: string,
  variables: object,
  headers: Array<any> | undefined = undefined,
) => {
  try {
    const postCall = await instance.post('graphql', {
      headers: headers ?? [],
      json: { query, variables },
    });
    const response: ResponseSchema = await postCall.json();
    if (response.errors) {
      throw new Error(response.errors[0].message);
    }
    const responseData: LoginData = loginDataSchema.parse(response);
    return responseData.data;
  } catch (error: any) {
    console.error('GraphQL request error:', error.message);
    throw error;
  }
};
