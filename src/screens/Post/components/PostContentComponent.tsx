import { PostSchemaType } from '@/hooks/domain/post/schema';
import { useTheme } from '@/theme';
import { Text } from '@ui-kitten/components';
import { memo } from 'react';
import { View } from 'react-native';

const PostContentComponent = memo(
  ({ postData }: { postData: PostSchemaType }) => {
    const { gutters } = useTheme();
    return (
      <View style={[gutters.marginBottom_16]}>
        <Text>{postData.content}</Text>
      </View>
    );
  },
);

export default PostContentComponent;
