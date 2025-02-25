import { CommentSchemaType } from '@/hooks/domain/comment/schema';
import { Avatar, ListItem } from '@ui-kitten/components';
import { memo } from 'react';

const PostCommentItem = memo(({ item }: { item: CommentSchemaType }) => {
  return (
    <ListItem
      title={item.user.displayName}
      description={item.content}
      accessoryLeft={props => (
        <Avatar
          resizeMode="contain"
          source={{ uri: item.user.avatarUrl }}
          style={{ alignSelf: 'flex-start' }}
        />
      )}
    />
  );
});

export default PostCommentItem;
