import { useUser } from '@/hooks';
import { useComments } from '@/hooks/domain/comment/useComment';
import { PostQueryKey, usePosts } from '@/hooks/domain/post/usePost';
import { useTheme } from '@/theme';
import { Avatar, Button, Icon, Input } from '@ui-kitten/components';
import { use } from 'i18next';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ViewProps, Animated } from 'react-native';

export const COMMENT_INPUT_HEIGHT = 60;

const CommentInput = memo(
  (props: { postId: string; style?: Readonly<ViewProps> | any }) => {
    const { layout, gutters } = useTheme();
    const { t } = useTranslation();
    const [commentText, setCommentText] = useState('');
    const { useSubmitOneCommentMutation } = useComments();
    const { invalidateQuery } = usePosts();

    const { mutateAsync, isPending } = useSubmitOneCommentMutation();

    const onSubmit = useCallback(async (text: string) => {
      if (text) {
        console.log('Vao day: onsibmit');
        await mutateAsync({
          content: text,
          postId: parseInt(props.postId, 10),
        });
        invalidateQuery([PostQueryKey.fetchOnePost + props.postId]);
      }
    }, []);

    return (
      <Animated.View style={props.style}>
        <View
          style={[
            layout.row,
            layout.itemsCenter,
            gutters.padding_6,
            {
              height: COMMENT_INPUT_HEIGHT,
            },
          ]}>
          <Input
            style={[
              layout.flex_1,
              gutters.marginHorizontal_6,
              { borderRadius: 50 },
            ]}
            multiline
            disabled={isPending}
            value={commentText}
            placeholder={t('screen_comment.comment...')}
            onChangeText={nextValue => setCommentText(nextValue)}
          />
          <Button
            onPress={() => onSubmit(commentText)}
            size="large"
            appearance="ghost">
            {t('screen_comment.send')}
          </Button>
        </View>
      </Animated.View>
    );
  },
);

export default CommentInput;
