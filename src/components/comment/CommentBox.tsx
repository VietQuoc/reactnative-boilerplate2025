import { useUser } from '@/hooks';
import { useTheme } from '@/theme';
import { Avatar, Icon, Input } from '@ui-kitten/components';
import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Video from 'react-native-video';

export const COMMENT_BOX_HEIGHT = 60;

const CommentBox = memo((props: any) => {
  const { layout, gutters } = useTheme();
  const { useFetchCurrentUserQuery } = useUser();
  const { data } = useFetchCurrentUserQuery();
  const { t } = useTranslation();
  const [commentText, setCommentText] = useState('');
  const [medias, setMedias] = useState<{
    images: Array<string>;
    videos: Array<string>;
  }>({
    images: [],
    videos: [],
  });

  const takeMedias = useCallback(async () => {
    const result = await launchImageLibrary({
      mediaType: 'mixed',
      selectionLimit: 0,
    });
    if (result) {
      const listImages: Array<string> = [];
      const listVideos: Array<string> = [];
      result?.assets?.map(item => {
        if (item?.uri) {
          if (item.type?.includes('image')) {
            listImages.push(item.uri);
          }
          if (item.type?.includes('video')) {
            listVideos.push(item.uri);
          }
        }
      });
      setMedias({ images: listImages, videos: listVideos });
    }
  }, []);

  return (
    <View style={props.style}>
      <View
        style={[
          { height: COMMENT_BOX_HEIGHT },
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
          accessoryRight={props => (
            <View style={layout.row}>
              <Icon
                {...props}
                name="video"
                onPress={() => launchCamera({ mediaType: 'mixed' })}
              />
              <Icon {...props} onPress={takeMedias} name="image" />
            </View>
          )}
        />
      </View>
      <View
        style={[
          layout.row,
          layout.wrap,
          layout.flex_1,
          gutters.marginHorizontal_12,
        ]}>
        {medias.images.map(item => (
          <Image
            key={item}
            width={60}
            height={60}
            style={[{ borderRadius: 10 }, gutters.marginHorizontal_6]}
            source={{ uri: item }}
          />
        ))}
        {medias.videos.map(item => (
          <View key={item} style={gutters.marginHorizontal_6}>
            <Video
              playInBackground={false}
              playWhenInactive={false}
              paused={true}
              style={{ borderRadius: 20, width: 60, height: 60 }}
              source={{ uri: item }}
            />
            <View
              style={[
                layout.absolute,
                { width: 60, height: 60 },
                layout.justifyCenter,
                layout.itemsCenter,
              ]}>
              <Icon
                {...props}
                style={{ width: 30, height: 30 }}
                name="play-circle"
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
});

export default CommentBox;
