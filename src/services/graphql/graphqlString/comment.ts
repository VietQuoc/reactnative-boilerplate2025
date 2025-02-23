import { gql } from '@apollo/client';
export const COMMENT_CREATE_MUTATION = `mutation CreateComment($createCommentInput: CreateCommentInput!) {
  createComment(createCommentInput: $createCommentInput) {
    id
    content
    createdAt
    likes {
      type
      isLikedByCurrentUser
    }
    user {
      displayName
      avatarUrl
      id
    }
  }
}`;

export const COMMENT_CONNECTION_QUERY = `
query Comments($findInput: PaginationFindInput!, $postId: Float!) {
  comments(findInput: $findInput, postId: $postId) {
    edges {
      cursor
      node {
        id
    content
    createdAt
    likes {
      type
      isLikedByCurrentUser
    }
    user {
      displayName
      avatarUrl
      id
    }
      }
    }
    pageInfo {
      endCursor
      hasNextPage
    }
    totalCount
  }
}`;

export const COMMENT_SUBSCRIPTION_STRING = gql`
  subscription CommentAdded($postId: Float!) {
    commentAdded(postId: $postId) {
      id
      content
      createdAt
      likes {
        type
        isLikedByCurrentUser
      }
      user {
        displayName
        avatarUrl
        id
      }
    }
  }
`;
