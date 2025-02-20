const POST_CONNECTION_QUERY_STRING = `
query QueryPost($findInput: PaginationFindInput!) {
  posts(findInput: $findInput) {
    edges {
      cursor
      node {
        content
        id
        medias {
          type
          uri
        }
        privacy
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
        medias {
          type
          uri
        }
        privacy
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

const POST_CREATION_MUTATION_STRING = `mutation CreatePost($createPostInput: CreatePostInput!, $images: [Upload], $videos: [Upload]) {
    createPost(createPostInput: $createPostInput, images: $images, videos: $videos) {
      content
      createdAt
      id
      updatedAt
      medias {
        type
        uri
      }
      user { id }
    }
  }`;

export {
  POST_CONNECTION_QUERY_STRING,
  POST_QUERY_STRING,
  POST_CREATION_MUTATION_STRING,
};
