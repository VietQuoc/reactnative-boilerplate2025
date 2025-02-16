export const LOGIN_MUTATION_STRING = `
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
export const REFRESH_TOKEN_STRING = `
mutation RefreshToken($authInput: RefreshTokenInput!) {
  refreshToken(authInput: $authInput) {
    access_token
    refresh_token
    user {
      id
    }
  }
}`;
