import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { ImageProps, PanResponder, StyleSheet, View } from 'react-native';
import {
  Button,
  Icon,
  IconElement,
  Layout,
  Popover,
  Text,
} from '@ui-kitten/components';
import { useTheme } from '@/theme';
import { useTranslation } from 'react-i18next';
import LikeSelector from './LikeSelector';
import { LikeTypes, likeTypeToIconMap } from '@/hooks/domain/like/enums';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import {
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';

export const LikeButton = (props: any): React.ReactElement => {
  const { layout, gutters } = useTheme();
  const { isLikedByCurrentUser } = props;
  const { isLiked, type } = isLikedByCurrentUser;
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [activeIcon, setActiveIcon] = useState({ active: false, index: 0 });
  const activeIconSV = useSharedValue({ active: false, index: 0 });
  const pulseIconRef = useRef<Icon<Partial<ImageProps>>>();
  const {
    handleLike,
    handleDisLike,
  }: { handleLike: any; handleDisLike: Function } = props;
  const likeTypesValues = useMemo(() => Object.values(LikeTypes), []);

  useEffect(() => {
    pulseIconRef?.current?.startAnimation();
  }, []);

  const handleClickLike = useCallback(
    (type: LikeTypes = LikeTypes.Like) => {
      if (isLiked) handleDisLike();
      else handleLike(type);
    },
    [isLiked],
  );

  const LikeIcon = (props: any): IconElement => (
    <Icon
      {...props}
      ref={pulseIconRef}
      animationConfig={{ cycles: Infinity }}
      animation="zoom"
      pack="vector"
      name={props.name}
    />
  );

  const gesture = Gesture.Pan()
    .onUpdate(event => {
      // Tính toán index dựa vào event.x và event.y
      let newIcon = { active: false, index: 0 };
      if (visible && event.y >= -70 && event.y <= 50) {
        let index = 0;
        if (event.x < 50) index = 0;
        else if (event.x < 100) index = 1;
        else if (event.x < 150) index = 2;
        else if (event.x < 200) index = 3;
        else if (event.x < 250) index = 4;
        else if (event.x < 300) index = 5;
        else if (event.x < 350) index = 6;
        newIcon = { active: true, index };
      }
      activeIconSV.value = newIcon;
    })
    .onEnd(() => {
      if (activeIconSV.value.active) {
        runOnJS(handleLike)(likeTypesValues[activeIconSV.value.index]);
        runOnJS(setVisible)(false);
      }
      activeIconSV.value = { active: false, index: 0 };
    });

  useAnimatedReaction(
    () => activeIconSV.value,
    (current, previous) => {
      if (current !== previous) {
        if (!current.active) {
          runOnJS(setActiveIcon)(current);
        } else runOnJS(setActiveIcon)(current);
      }
    },
  );
  const renderToggleButton = (): React.ReactElement => (
    <View>
      <Button
        size="small"
        appearance="ghost"
        onPress={() => handleClickLike()}
        onLongPress={() => setVisible(true)}
        style={[gutters.marginRight_3]}
        accessoryLeft={props => (
          <LikeIcon
            {...props}
            isLiked={isLiked}
            name={isLiked ? likeTypeToIconMap[type] : 'thumbs-up'}
          />
        )}>
        {isLiked ? t('screen_post.' + type) : t('screen_post.like')}
      </Button>
    </View>
  );

  return (
    <GestureDetector gesture={gesture}>
      <View>
        <Popover
          anchor={renderToggleButton}
          visible={visible}
          placement="top start"
          style={{ borderRadius: 15, borderWidth: 2 }}
          onBackdropPress={() => setVisible(false)}>
          <Layout style={styles.content}>
            <LikeSelector
              isLikedByCurrentUser={isLikedByCurrentUser}
              handleLike={handleLike}
              handleDisLike={handleDisLike}
              setVisible={setVisible}
              activeIcon={activeIcon}
            />
          </Layout>
        </Popover>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 64,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderRadius: 10,
  },
  avatar: {
    marginHorizontal: 4,
  },
});
