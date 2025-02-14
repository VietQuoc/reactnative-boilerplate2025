import { Layout, Text } from '@ui-kitten/components';
import { Animated, View } from 'react-native';

function GoodsScreen() {
  return (
    <Layout level="1" style={{ flex: 1 }}>
      {/* <Animated.ScrollView
        // style={[styles.scrollView]}
        contentContainerStyle={{ paddingTop: 56 }} // để tránh nội dung bị che header
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}>
        <View>
          <Text>Nội dung của ứng dụng, ví dụ danh sách bài viết...</Text>
          <View style={{ height: 1000 }} />
        </View>
      </Animated.ScrollView> */}
    </Layout>
  );
}

export default GoodsScreen;
