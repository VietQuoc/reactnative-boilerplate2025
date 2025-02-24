import { BackIcon } from '@/components/ui/icons/CustomIcon';
import { Privacy } from '@/hooks/domain/post/schema';
import { PostQueryKey, usePosts } from '@/hooks/domain/post/usePost';
import { useTheme } from '@/theme';
import { useNavigation } from '@react-navigation/native';
import {
  Button,
  Icon,
  IconElement,
  Input,
  Layout,
  Spinner,
  Text,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  Asset,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Video from 'react-native-video';

const Privacies = Object.values(Privacy);

function PostCreator(props: any) {
  const { layout, gutters } = useTheme();
  const { bottom } = useSafeAreaInsets();
  const { t }: any = useTranslation();
  const { goBack }: any = useNavigation();
  const { useSubmitOnePostMutation, invalidateQuery } = usePosts();
  const { mutateAsync, isPending } = useSubmitOnePostMutation();

  const [content, setContent] = useState('');
  const [medias, setMedias] = useState<Array<Asset>>([]);
  const [privacy, setPrivacy] = useState(Privacy.PUBLIC);

  const takeMedias = useCallback(async () => {
    const result = await launchImageLibrary({
      mediaType: 'mixed',
      selectionLimit: 0,
    });
    if (result?.assets) {
      setMedias(result.assets);
    }
  }, []);
  const recordMedias = useCallback(async () => {
    const result = await launchCamera({ mediaType: 'mixed' });
    console.log(result);
    // if (result) {
    //   const listImages: Array<string> = [];
    //   const listVideos: Array<string> = [];
    //   result?.assets?.map(item => {
    //     if (item?.uri) {
    //       if (item.type?.includes('image')) {
    //         listImages.push(item.uri);
    //       }
    //       if (item.type?.includes('video')) {
    //         listVideos.push(item.uri);
    //       }
    //     }
    //   });
    //   setMedias({ images: listImages, videos: listVideos });
    // }
  }, []);
  const submitPost = useCallback(
    async (data: {
      content: string;
      privacy: Privacy;
      medias: Array<Asset>;
    }) => {
      console.log('submitPost: ', data.content, data.privacy, data.medias);
      await mutateAsync({
        content: data.content,
        privacy: data.privacy,
        files: data.medias,
      }).then(() => {
        invalidateQuery([PostQueryKey.fetchCurrent]).then(() => goBack());
      });
    },
    [],
  );

  return (
    <Layout style={[props.style, layout.flex_1]}>
      <SafeAreaView>
        <TopNavigation
          alignment="center"
          title={t('screen_post.create_new_post')}
          accessoryLeft={() => (
            <TopNavigationAction icon={BackIcon} onPress={() => goBack()} />
          )}
        />
        <ScrollView>
          <Input
            multiline={true}
            placeholder={t('screen_post.content...')}
            style={[gutters.marginHorizontal_6, gutters.marginTop_16]}
            textStyle={{ minHeight: 200 }}
            value={content}
            onChangeText={text => setContent(text)}
          />
          <View style={[layout.row, layout.justifyBetween]}>
            <Button
              // status="success"
              style={{ alignSelf: 'flex-start' }}
              appearance="ghost"
              size="small"
              onPress={() => {
                const currentIndex = Privacies.indexOf(privacy);
                const nextIndex = (currentIndex + 1) % Privacies.length;
                setPrivacy(Privacies[nextIndex]);
              }}
              accessoryLeft={() => <Text>{t('screen_post.privacy')}:</Text>}>
              {t('screen_post.' + privacy.toLowerCase())}
            </Button>
            <View style={layout.row}>
              {/* <Button
                appearance="ghost"
                size="medium"
                accessoryRight={iconProps => (
                  <Icon {...iconProps} name="video" onPress={recordMedias} />
                )}
              /> */}
              <Button
                appearance="ghost"
                size="medium"
                accessoryRight={iconProps => (
                  <Icon {...iconProps} onPress={takeMedias} name="image" />
                )}
              />
            </View>
          </View>
          <View
            style={[
              layout.row,
              layout.wrap,
              layout.flex_1,
              gutters.marginHorizontal_12,
            ]}>
            {medias.map(item => {
              if (item.type?.includes('image'))
                return (
                  <Image
                    key={item.uri}
                    width={60}
                    height={60}
                    style={[{ borderRadius: 10 }, gutters.marginHorizontal_6]}
                    source={{ uri: item.uri }}
                  />
                );
              else
                return (
                  <View key={item.uri} style={gutters.marginHorizontal_6}>
                    <Video
                      playInBackground={false}
                      playWhenInactive={false}
                      paused={true}
                      style={{ borderRadius: 20, width: 60, height: 60 }}
                      source={{ uri: item.uri }}
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
                );
            })}
          </View>
          {isPending ? (
            <Button
              size="medium"
              style={[
                {
                  alignSelf: 'center',
                  marginBottom: bottom + 20,
                  marginTop: 20,
                },
              ]}
              appearance="outline"
              accessoryLeft={(iconProps: any) => (
                <View style={iconProps.style}>
                  <Spinner size="small" />
                </View>
              )}>
              {t('screen_post.submit_post')}
            </Button>
          ) : (
            <Button
              size="medium"
              style={[
                {
                  alignSelf: 'center',
                  marginBottom: bottom + 20,
                  marginTop: 20,
                },
              ]}
              accessoryLeft={iconProps => (
                <Icon {...iconProps} name="checkmark-circle" />
              )}
              onPress={() => submitPost({ content, privacy, medias })}>
              {t('screen_post.submit_post')}
            </Button>
          )}
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
}

export default PostCreator;
