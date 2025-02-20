import { PostSchemaType } from '@/hooks/domain/post/schema';
import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import { Icon, Text } from '@ui-kitten/components';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { TouchableWithoutFeedback, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Video from 'react-native-video';

const ImageShow = memo(
  ({
    item,
    index,
    id,
  }: {
    item: { type: 'image' | 'video'; uri: string };
    index: number;
    id: number;
  }) => {
    const { layout, fonts } = useTheme();
    const { t } = useTranslation();
    const { navigate }: { navigate: any } = useNavigation();
    return (
      <TouchableWithoutFeedback
        onPress={() => navigate(Paths.PostDetail, { id, imageIndex: index })}>
        <View
          style={{
            borderWidth: 0.2,
            borderRadius: 5,
            borderColor: 'gray',
            flex: 1,
          }}>
          {item.type === 'image' ? (
            <Animated.Image
              source={{ uri: item.uri }}
              resizeMode="contain"
              sharedTransitionTag="media"
              style={[
                {
                  aspectRatio: 1 / 1,
                },
              ]}
            />
          ) : (
            <View
              style={[
                {
                  aspectRatio: 1 / 1,
                },
              ]}>
              <Video
                playInBackground={false}
                playWhenInactive={false}
                paused={true}
                style={{ width: '100%', height: '100%' }}
                source={{ uri: item.uri }}
              />
              <View
                style={[
                  layout.absolute,
                  { width: '100%', height: '100%' },
                  layout.justifyCenter,
                  layout.itemsCenter,
                ]}>
                <Icon style={{ width: 30, height: 30 }} name="play-circle" />
              </View>
            </View>
          )}
          {index === 3 && (
            <View
              style={[
                layout.absolute,
                layout.flex_1,
                layout.itemsCenter,
                layout.justifyCenter,
                {
                  backgroundColor: 'rgba(40, 21, 21, 0.5)',
                  width: '100%',
                  height: '100%',
                },
              ]}>
              <Icon
                name="plus"
                style={[{ width: 30, height: 30, tintColor: '#DFDFDF' }]}
              />
              <Text style={[fonts.size_24, fonts.gray100, fonts.bold]}>
                {t('screen_post.more')}
              </Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  },
);

const PostMediaComponent = memo(
  ({ postData }: { postData: PostSchemaType }) => {
    const { layout } = useTheme();
    const { medias } = postData;

    return (
      <View style={[layout.row]}>
        <FlatList
          data={medias.slice(0, 4)}
          keyExtractor={item => item.uri}
          numColumns={2}
          contentContainerStyle={layout.flex_1}
          renderItem={({ item, index }) => (
            <ImageShow
              item={item}
              index={index}
              id={parseInt(postData.id, 10)}
            />
          )}
        />
      </View>
    );
  },
);

export default PostMediaComponent;
