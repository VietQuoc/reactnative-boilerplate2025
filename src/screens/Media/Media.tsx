import { useNavigation } from '@react-navigation/native';
import { Button } from '@ui-kitten/components';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Carousel from 'react-native-snap-carousel';

function MediaScreen(props: any) {
  const { width, height } = useWindowDimensions();
  const { index: i, imageUrls }: { index: number; imageUrls: Array<string> } =
    props?.route?.params;

  const renderItem = ({ item, index }: { item: string; index: number }) => {
    return (
      <View style={{}}>
        <Animated.Image
          source={{ uri: item }}
          style={{ width: width, height: width }}
          sharedTransitionTag="media"
          resizeMode={'contain'}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        layout={'default'}
        data={imageUrls}
        renderItem={renderItem}
        sliderWidth={width}
        sliderHeight={height}
        itemWidth={width}
        style={{ backgroundColor: 'red' }}
      />
    </View>
  );
}

export default MediaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
});
