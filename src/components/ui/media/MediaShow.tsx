import { useTheme } from '@/theme';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Image, useWindowDimensions, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { ImageGallery } from '../images/image-viewer';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';

type MediaShowInput = {
  listUrls: Array<string>;
  initIndex: number;
};

const MediaShow = memo((props: MediaShowInput) => {
  const { listUrls, initIndex } = props;
  const { width, height } = useWindowDimensions();
  const { layout } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(initIndex || 0);

  const carouselRef = useRef<any>(null);

  const [isOpenGallery, setIsOpenGallery] = useState({
    isOpen: false,
    initIndex: initIndex,
  });
  const images = useMemo(
    () => listUrls.map((item, index) => ({ id: index, url: item })),
    [],
  );

  useEffect(() => {
    if (
      initIndex &&
      listUrls &&
      listUrls.length > initIndex &&
      carouselRef.current
    ) {
      console.log('call');
      setTimeout(() => {
        carouselRef.current.snapToItem(initIndex);
      }, 500);
    }
  }, [initIndex, listUrls, carouselRef]);

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => setIsOpenGallery({ isOpen: true, initIndex: index })}>
        <Image
          source={{ uri: item }}
          style={{ width: width, height: width }}
          resizeMode={'contain'}
        />
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View>
      <Carousel
        ref={carouselRef}
        layout={'default'}
        data={listUrls}
        renderItem={renderItem}
        sliderWidth={width}
        sliderHeight={height}
        itemWidth={width}
        pagingEnabled={true}
        enableSnap={true}
        enableMomentum={true}
        onSnapToItem={i => setCurrentIndex(i)}></Carousel>
      <Pagination
        dotsLength={listUrls.length}
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
        images={images}
        initialIndex={isOpenGallery.initIndex}
      />
    </View>
  );
});

export default MediaShow;
