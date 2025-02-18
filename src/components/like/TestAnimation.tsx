import React, { useRef, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withSpring,
  SharedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const ICON_SIZE = 40;
const SPACING = 10;
const ICONS = ['👍', '❤️', '😂', '😮', '😢', '🔥'];

const TestAnimation = () => {
  const [selectedReaction, setSelectedReaction] = useState('');
  const activeIndex = useSharedValue(-1);
  const isActive = useSharedValue(false);

  // Xử lý animation cho từng icon
  const animatedIconStyle = (index: number, activeIndex: SharedValue<number>) =>
    useAnimatedStyle(() => ({
      transform: [
        {
          scale: withSpring(activeIndex.value === index ? 1.5 : 1),
        },
        {
          translateY: withSpring(activeIndex.value === index ? -30 : 0),
        },
      ],
      opacity: withSpring(activeIndex.value === index ? 1 : 0.7),
    }));

  // Cập nhật index đang được hover
  function updateActiveIndex(xPosition: number) {
    const containerWidth = (ICON_SIZE + SPACING) * ICONS.length;
    const startX = (width - containerWidth) / 2;
    const adjustedX = xPosition - startX;

    const newIndex = Math.floor(adjustedX / (ICON_SIZE + SPACING));

    if (newIndex >= 0 && newIndex < ICONS.length) {
      activeIndex.value = newIndex;
    } else {
      activeIndex.value = -1;
    }
  }
  // Xử lý gesture
  const panGesture = Gesture.Pan()
    .onBegin(event => {
      isActive.value = true;
      updateActiveIndex(event.x);
    })
    .onUpdate(event => {
      updateActiveIndex(event.x);
    })
    .onEnd(() => {
      if (activeIndex.value !== -1) {
        setSelectedReaction(ICONS[activeIndex.value]);
      }
      isActive.value = false;
      activeIndex.value = -1;
    });

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.iconsContainer}>
        {ICONS.map((icon, index) => (
          <Animated.Text
            key={index}
            style={[styles.icon, animatedIconStyle(index, activeIndex)]}>
            {icon}
          </Animated.Text>
        ))}
      </View>

      <GestureDetector gesture={panGesture}>
        <View style={styles.touchArea} />
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 30,
    backgroundColor: 'rgba(0,0,0,0.1)',
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  icon: {
    fontSize: ICON_SIZE,
    marginHorizontal: SPACING / 2,
  },
  touchArea: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 200,
  },
});

export default TestAnimation;
