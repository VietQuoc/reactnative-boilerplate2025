import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

const enum OrientationKey {
  Landscape = 'Landscape',
  Portrait = 'Portrait',
}

const getOrientation = (): OrientationKey => {
  const { width, height } = Dimensions.get('screen');
  return width > height ? OrientationKey.Landscape : OrientationKey.Portrait;
};

function useOrientation(): OrientationKey {
  const [orientation, setOrientation] = useState(OrientationKey.Portrait);

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(getOrientation());
    };

    const subscription = Dimensions.addEventListener(
      'change',
      handleOrientationChange,
    );

    return () => {
      subscription?.remove();
    };
  }, []);

  return orientation;
}

export { useOrientation, OrientationKey };
