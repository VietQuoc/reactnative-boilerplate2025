import { useTheme } from '@/theme';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Image, useWindowDimensions, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ImageGallery, ImageObject } from '../images/image-viewer';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import { PostSchemaType } from '@/hooks/domain/post/schema';
import Video from 'react-native-video';

type MediaShowInput = {
  data: PostSchemaType;
  initIndex: number;
};

const MediaShow = memo(
  (props: MediaShowInput) => {
    const { data, initIndex } = props;
    const { width, height } = useWindowDimensions();
    const { layout } = useTheme();
    const [currentIndex, setCurrentIndex] = useState(initIndex || 0);

    const carouselRef = useRef<any>(null);

    const [isOpenGallery, setIsOpenGallery] = useState({
      isOpen: false,
      initIndex: initIndex,
    });

    const imagesForGallery: ImageObject[] = useMemo(
      () =>
        data.medias.map((item, index) => ({
          id: index,
          url: item.uri,
          type: item.type,
        })),
      [],
    );

    useEffect(() => {
      if (
        initIndex &&
        data.medias &&
        data.medias.length > initIndex &&
        carouselRef.current
      ) {
        console.log('call');
        setTimeout(() => {
          carouselRef?.current?.snapToItem(initIndex);
        }, 1000);
      }
    }, [initIndex, data.medias, carouselRef]);

    const renderItem = ({ item, index }: { item: any; index: number }) => {
      return (
        <TouchableWithoutFeedback
          onPress={() => setIsOpenGallery({ isOpen: true, initIndex: index })}>
          {item.type === 'image' ? (
            <Image
              source={{ uri: item.uri }}
              style={{ width: width, height: width }}
              resizeMode={'contain'}
            />
          ) : (
            <Video
              source={{ uri: item.uri }}
              style={{ width: width, height: width }}
              resizeMode={'contain'}
              paused
            />
          )}
        </TouchableWithoutFeedback>
      );
    };

    return (
      <View>
        <Carousel
          ref={carouselRef}
          layout={'default'}
          data={data.medias}
          renderItem={renderItem}
          sliderWidth={width}
          sliderHeight={height}
          itemWidth={width}
          pagingEnabled={true}
          enableSnap={true}
          enableMomentum={true}
          onSnapToItem={i => setCurrentIndex(i)}></Carousel>
        <Pagination
          dotsLength={data.medias.length}
          activeDotIndex={currentIndex}
          containerStyle={[layout.absolute, { width: width }, layout.bottom0]}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            borderWidth: 0.2,
            borderColor: 'white',
            marginHorizontal: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
          }}
          inactiveDotStyle={
            {
              // Define styles for inactive dots here
            }
          }
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
        <ImageGallery
          close={() => setIsOpenGallery({ isOpen: false, initIndex: 0 })}
          isOpen={isOpenGallery.isOpen}
          images={imagesForGallery}
          initialIndex={isOpenGallery.initIndex}
        />
      </View>
    );
  },
  (prevProps, nextProps) => {
    return true;
  },
);

export default MediaShow;
