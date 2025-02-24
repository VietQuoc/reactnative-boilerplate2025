import { gql } from '@apollo/client';

export const REGISTER_MUTATION_STRING = gql`
  mutation Register($createUserInput: CreateUserInput!, $avatar: Upload) {
    register(createUserInput: $createUserInput, avatar: $avatar) {
      access_token
      refresh_token
      user {
        id
      }
    }
  }
`;
