import { IconByVariant } from '@/components/atoms';
import { useUser } from '@/hooks';
import { useTheme } from '@/theme';
import { Layout, Text } from '@ui-kitten/components';
import { useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_HEIGHT = 60;

function PostScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  const { colors, fonts, layout } = useTheme();
  const { useFetchCurrentUserQuery } = useUser();

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const insets = useSafeAreaInsets();

  const { data, isError } = useFetchCurrentUserQuery();
  console.log(data, isError, 'end');

  return (
    <Layout level="1" style={{ flex: 1 }}>
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateY: headerTranslateY }],
            opacity: headerOpacity,
          },
        ]}>
        <View style={styles.headerLeft}>
          <Text
            style={[
              {
                fontWeight: '900',
                color: '#ee4d2d',
                fontFamily: 'TheBomb',
              },
              fonts.size_24,
              layout.left10,
            ]}>
            WB
          </Text>
        </View>
        <View style={styles.headerRight}>
          <IconByVariant path={'send'} stroke={colors.purple500} />
          <IconByVariant path={'send'} stroke={colors.purple500} />
          <IconByVariant path={'send'} stroke={colors.purple500} />
        </View>
      </Animated.View>
      <Animated.ScrollView
        style={[styles.scrollView]}
        contentContainerStyle={{ paddingTop: insets.top + HEADER_HEIGHT }} // để tránh nội dung bị che header
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true },
        )}
        scrollEventThrottle={16}>
        <View style={styles.content}>
          <Text style={styles.contentText}>
            Nội dung của ứng dụng, ví dụ danh sách bài viết...
          </Text>
          <View style={{ height: 1000 }} />
        </View>
      </Animated.ScrollView>
    </Layout>
  );
}

const styles = StyleSheet.create({
  bottomNavigation: { marginVertical: 8 },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_HEIGHT,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 1000,
  },
  headerLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginLeft: 15,
  },
  scrollView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
  },
  content: {
    paddingHorizontal: 15,
  },
  contentText: {
    fontSize: 18,
  },
});

export default PostScreen;
