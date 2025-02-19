import { memo, useEffect, useRef, useState } from 'react';
import { Image, useWindowDimensions, View } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';

type MediaShowInput = {
  listUrls: Array<string>;
  initIndex: number;
};

const MediaShow = memo((props: MediaShowInput) => {
  const { listUrls, initIndex } = props;
  const { width, height } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(initIndex || 0);

  const carouselRef = useRef<any>(null);

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
      <View style={{}}>
        <Image
          source={{ uri: item }}
          style={{ width: width, height: width }}
          resizeMode={'contain'}
        />
      </View>
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
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(15, 12, 12, 0.92)',
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </View>
  );
});

export default MediaShow;
