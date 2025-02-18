import { PostSchemaType } from '@/hooks/domain/post/schema';
import { useTheme } from '@/theme';
import { Icon, Text } from '@ui-kitten/components';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const ImageShow = memo(({ item, index }: { item: string; index: number }) => {
  const { layout, fonts, gutters } = useTheme();
  const { t } = useTranslation();
  return (
    <View
      style={{
        borderWidth: 0.2,
        borderRadius: 5,
        borderColor: 'gray',
        flex: 1,
      }}>
      <Image
        source={{ uri: item }}
        resizeMode="contain"
        style={[
          {
            aspectRatio: 1 / 1,
          },
        ]}
      />
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
  );
});

const PostMediaComponent = memo(
  ({ postData }: { postData: PostSchemaType }) => {
    const { layout } = useTheme();
    const { imageUrls, videoUrls } = postData;
    const imagesShow = imageUrls.slice(0, 4);
    return (
      <View style={[layout.row]}>
        <FlatList
          data={imagesShow}
          keyExtractor={item => item}
          numColumns={2}
          contentContainerStyle={layout.flex_1}
          renderItem={({ item, index }) => (
            <ImageShow key={index} item={item} index={index} />
          )}
        />
      </View>
    );
  },
);

export default PostMediaComponent;
