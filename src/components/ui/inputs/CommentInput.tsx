import { useUser } from '@/hooks';
import { useTheme } from '@/theme';
import { Avatar, Input } from '@ui-kitten/components';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, ViewProps, Animated } from 'react-native';

export const COMMENT_INPUT_HEIGHT = 60;

const CommentInput = memo((props: { style?: Readonly<ViewProps> | any }) => {
  const { layout, gutters } = useTheme();
  const { useFetchCurrentUserQuery } = useUser();
  const { data } = useFetchCurrentUserQuery();
  const { t } = useTranslation();
  const [commentText, setCommentText] = useState('');

  return (
    <Animated.View style={props.style}>
      <View
        style={[
          { height: COMMENT_INPUT_HEIGHT },
          layout.row,
          layout.itemsCenter,
          gutters.padding_6,
        ]}>
        <Avatar
          resizeMode="none"
          size="medium"
          source={{ uri: data.avatarUrl }}
        />
        <Input
          style={[
            layout.flex_1,
            gutters.marginHorizontal_6,
            { borderRadius: 50 },
          ]}
          value={commentText}
          placeholder={t('screen_comment.comment...')}
          onChangeText={nextValue => setCommentText(nextValue)}
        />
      </View>
    </Animated.View>
  );
});

export default CommentInput;
