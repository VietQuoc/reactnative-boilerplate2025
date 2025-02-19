import { LikeSchema } from '@/hooks/domain/like/schema';
import { useTheme } from '@/theme';
import { Button, Icon } from '@ui-kitten/components';
import { ReactElement, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageProps, View } from 'react-native';
import LikeShowComponent from '../../../components/like/LikeShowComponent';
import { LikeButton } from '../../../components/like/LikeButton';
import { useNavigation } from '@react-navigation/native';
import { Paths } from '@/navigation/paths';

const PostComponentFooter = (props: any): ReactElement => {
  const { layout, gutters } = useTheme();
  const { t } = useTranslation();
  const { navigate }: { navigate: any } = useNavigation();
  const pulseIconRef = useRef<Icon<Partial<ImageProps>>>();

  const likes: LikeSchema[] = props.likes;

  useEffect(() => {
    pulseIconRef?.current?.startAnimation();
  }, []);

  return (
    <View {...props} style={[gutters.margin_6]}>
      <LikeShowComponent likes={likes} />
      <View style={[layout.row, layout.justifyBetween]}>
        <LikeButton
          handleLike={props.handleLike}
          handleDisLike={props.handleDisLike}
          isLikedByCurrentUser={props.isLikedByCurrentUser}
        />
        <Button
          size="small"
          appearance="ghost"
          style={gutters.marginRight_3}
          onPress={() =>
            navigate(Paths.PostDetail, { id: props.postId, imageIndex: 0 })
          }
          accessoryLeft={props => (
            <Icon {...props} pack="vector" name="comment" />
          )}>
          {t('screen_post.comment')}
        </Button>
      </View>
    </View>
  );
};

export default PostComponentFooter;
