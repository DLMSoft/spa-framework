import React from 'react';

export interface UIState {
    isSideMenuFolded?: boolean,
    currentMenuItem?: string
};

export interface UIContextValue {
    state: UIState,
    setState: (state: UIState) => void;
}

const context = React.createContext<UIContextValue>({
    state: {
        isSideMenuFolded: false,
        currentMenuItem: null
    },
    setState: () => {}
});

export default context;