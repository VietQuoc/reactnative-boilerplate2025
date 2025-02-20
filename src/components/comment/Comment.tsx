import { memo } from 'react';
import PostInput, { PostInputType } from '../ui/inputs/PostInput';

const Comment = memo(() => {
  return <PostInput type={PostInputType.Comment} />;
});

export default Comment;
