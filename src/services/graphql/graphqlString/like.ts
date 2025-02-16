export const LIKE_POST_STRING = `
mutation LikePost($createLikePostInput: CreateLikePostInput!) {
  likePost(createLikePostInput: $createLikePostInput) {
    id
    createdAt
    type
    post {
      id
    }
    user {
      displayName
    }
  }
}`;
export const DISLIKE_POST_STRING = `
mutation DisLikePost($postId: Float!) {
  disLikePost(postId: $postId)
}`;
export const LIKE_COMMENT_STRING = `
mutation LikeComment($createLikeCommentInput: CreateLikeCommentInput!) {
  likeComment(createLikeCommentInput: $createLikeCommentInput) {
    id
    type
    createdAt
    comment {
      id
    }
    user {
      displayName
    }
  }
}`;
export const DISLIKE_COMMENT_STRING = `
mutation DisLikeComment($commentId: Float!) {
  disLikeComment(commentId: $commentId)
}`;
