import { useUser } from '@/hooks';
import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { Avatar, Input } from '@ui-kitten/components';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  View,
  ViewProps,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

export const POST_INPUT_HEIGHT = 60;
export enum PostInputType {
  Post = 'post',
  PostCreator = 'postcreator',
  Comment = 'comment',
}

const PostInput = memo((props: { style?: Readonly<ViewProps> | any }) => {
  const { layout, gutters } = useTheme();
  const { navigate }: any = useNavigation();
  const { useFetchCurrentUserQuery } = useUser();
  const { data } = useFetchCurrentUserQuery();
  const { t } = useTranslation();
  console.log(data);
  if (!data) return null;
  return (
    <Animated.View style={props.style}>
      <View
        style={[
          { height: POST_INPUT_HEIGHT },
          layout.row,
          layout.itemsCenter,
          gutters.padding_6,
        ]}>
        <Avatar
          resizeMode="none"
          size="medium"
          source={{ uri: data.avatarUrl }}
        />
        <View style={[layout.flex_1, gutters.marginHorizontal_6]}>
          <Input
            readOnly
            style={[{ borderRadius: 50 }]}
            placeholder={t('screen_post.create_post')}
          />
          <TouchableWithoutFeedback onPress={() => navigate(Paths.PostCreator)}>
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: POST_INPUT_HEIGHT - 12,
                flex: 1,
              }}></View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Animated.View>
  );
});

export default PostInput;
