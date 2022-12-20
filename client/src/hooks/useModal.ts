import { useState } from 'react';

export const useModal = (isVisible = false) => {
    const [visible, setVisible] = useState(isVisible);

    const open = () => setVisible(true);
    const close = () => setVisible(false);

    return {
        visible,
        setVisible,
        open,
        close,
    };
};
