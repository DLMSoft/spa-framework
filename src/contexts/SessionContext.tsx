import React from 'react';

export interface SessionInfo {
    isLoggedIn: boolean;
    userInfo?: {
        id: string;
        displayName: string;
    };
    sessionId?: string;
    permissionNodes?: string[];
}

export interface SessionContextValue {
    session: SessionInfo
    changeState: (state: SessionInfo) => void;
}

const SessionContext = React.createContext<SessionContextValue>({
    session: {
        isLoggedIn: false
    },
    changeState: () => {}
});

export default SessionContext;