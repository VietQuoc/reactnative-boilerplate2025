import { useContext } from 'react';

import { PopupContext } from '@/components/ui/popups/PopupProvider';

const usePopup = () => {
  const context = useContext(PopupContext);

  if (context === undefined) {
    throw new Error('usePopup must be used within a PopupProvider');
  }

  return context;
};

export default usePopup;
