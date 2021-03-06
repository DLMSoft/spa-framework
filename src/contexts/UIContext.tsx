import React from 'react';

export interface BreadcrumbItem {
    name: string,
    label: string
};

export interface UIState {
    isSideMenuFolded?: boolean;
    sideMenuOpenKey?: string[];
    currentMenuItem?: string;
    breadcrumb?: BreadcrumbItem[];
};

export interface UIContextValue {
    state: UIState,
    setState: (state: UIState) => void;
}

const context = React.createContext<UIContextValue>({
    state: {
        isSideMenuFolded: false,
        sideMenuOpenKey: [],
        currentMenuItem: '/',
        breadcrumb: []
    },
    setState: () => {}
});

export default context;