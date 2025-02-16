import React, { useCallback, useEffect, useRef } from 'react';
import { ImageProps, StyleSheet } from 'react-native';
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

export const LikeButton = (props: any): React.ReactElement => {
  const { layout, gutters } = useTheme();
  const { isLikedByCurrentUser } = props;
  const { isLiked, type } = isLikedByCurrentUser;
  const { t } = useTranslation();
  const [visible, setVisible] = React.useState(false);
  const pulseIconRef = useRef<Icon<Partial<ImageProps>>>();
  const {
    handleLike,
    handleDisLike,
  }: { handleLike: Function; handleDisLike: Function } = props;

  useEffect(() => {
    pulseIconRef?.current?.startAnimation();
  }, []);

  const handleClickLike = useCallback(() => {
    if (isLiked) handleDisLike();
    else handleLike(LikeTypes.Like);
  }, [isLiked]);

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
  const renderToggleButton = (): React.ReactElement => (
    <Button
      size="small"
      appearance="ghost"
      onPress={handleClickLike}
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
  );

  return (
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
        />
      </Layout>
    </Popover>
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
