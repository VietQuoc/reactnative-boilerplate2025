const POST_CONNECTION_QUERY_STRING = `
query QueryPost($findInput: PaginationFindInput!) {
  posts(findInput: $findInput) {
    edges {
      cursor
      node {
        content
        id
        imageUrls
        privacy
        videoUrls
        createdAt
        updatedAt
        isLikedByCurrentUser {
          type
          isLiked
        }
        user {
          avatarUrl
          displayName
          id
        }
        comments {
          content
          createdAt
          id
        }
        likes {
          id
          type
          user {
            id
          }
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

const POST_QUERY_STRING = `query Post($postId: Float!) {
  post(id: $postId) {
    content
        createdAt
        updatedAt
        id
        imageUrls
        privacy
        videoUrls
        user {
          avatarUrl
          displayName
          id
        }
        comments {
          content
          createdAt
          id
        }
        likes {
          id
          type
          user {
            id
          }
        }
        isLikedByCurrentUser {
          type
          isLiked
        }
  }
}`;

export { POST_CONNECTION_QUERY_STRING, POST_QUERY_STRING };
