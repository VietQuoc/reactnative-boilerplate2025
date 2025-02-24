import { useTheme } from '@/theme';
import { Button, Card, Modal, Text } from '@ui-kitten/components';
import { createContext, useCallback, useState } from 'react';
import { useWindowDimensions } from 'react-native';

type PopupContextType = {
  showPopup: (message: string, onClose: () => void) => void;
};

export const PopupContext = createContext<PopupContextType>({
  showPopup: () => {},
});

export function PopupProvider({ children }: any) {
  const { backgrounds } = useTheme();
  const { height } = useWindowDimensions();
  const [popup, setPopup] = useState({
    visible: false,
    message: '',
    onClose: () => {},
  });

  const showPopup = useCallback(
    (message: string, onClose: () => void) => {
      setPopup({
        visible: true,
        message,
        onClose,
      });
    },
    [popup],
  );

  function hidePopup() {
    setPopup(prev => ({ ...prev, visible: false }));
    popup.onClose && popup.onClose();
  }

  return (
    <PopupContext.Provider value={{ showPopup }}>
      {children}
      <Modal
        visible={popup.visible}
        backdropStyle={backgrounds.background}
        onBackdropPress={hidePopup}>
        <Card style={{ maxHeight: height - 200 }} disabled={true}>
          <Text>{popup.message}</Text>
          <Button onPress={hidePopup}>OK</Button>
        </Card>
      </Modal>
    </PopupContext.Provider>
  );
}
