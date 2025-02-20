import React, { useRef } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { ImagePreviewProps } from './types';
import Video, { VideoRef } from 'react-native-video';

const { height, width } = Dimensions.get('window');

const ImagePreview = ({
  index,
  isSelected,
  item,
  renderCustomImage,
  resizeMode,
}: ImagePreviewProps) => {
  const videoRef = useRef<VideoRef>(null);
  const onPressVideo = () => {
    if (videoRef?.current) {
      videoRef.current.presentFullscreenPlayer();
    }
  };
  return (
    <View>
      <TouchableWithoutFeedback onPress={onPressVideo}>
        <View style={styles.containerStyle}>
          {renderCustomImage ? (
            renderCustomImage(item, index, isSelected)
          ) : item.type === 'image' ? (
            <Image
              resizeMode={resizeMode}
              source={{ uri: item.url }}
              style={styles.image}
            />
          ) : (
            <Video
              ref={videoRef}
              resizeMode={'contain'}
              source={{ uri: item.url }}
              style={styles.image}
              paused
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height,
    width,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});

export default ImagePreview;
