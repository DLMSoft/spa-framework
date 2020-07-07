import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Layout, Skeleton } from 'antd';

import { getSession, setSession } from '../common/httpUtils';
import SideMenu from '../components/SideMenu';
import ControlPanelHeader from '../components/ControlPanelHaader';
import { BasePageProps } from '../common/props';
import { getUserInfo } from '../api/login';

import styles from './BasicLayout.less';
import { Lifter } from '../common/hoc-lifeter';
import { ClickParam } from 'antd/lib/menu';
import UIContext, { UIState, UIContextValue } from '../contexts/UIContext';
import SessionContext, { SessionInfo, SessionContextValue } from '../contexts/SessionContext';

const { Content } = Layout;


function getRoutes(routes: Object) {
    const result = [];

    let defaultPage = null;

    for (const path in routes) {
        if (!routes.hasOwnProperty(path))
            continue;
        if (path.startsWith('/user'))
            continue;
        if (path == '/')
            continue;
        if (!defaultPage)
            defaultPage = path;
        result.push(<Route key={path} path={path} exact component={routes[path].component} />);
    }

    if (defaultPage) {
        result.push(<Redirect key="0" from="/" to={defaultPage} />);
    }

    return result;
}

interface BasicLayoutProps extends BasePageProps {
    routes: object;
}

interface BasicLayoutState {
    isLoading: boolean,
    uiState: UIContextValue
}

export default class BasicLayout extends Component<BasicLayoutProps, BasicLayoutState> {
    static contextType = SessionContext;

    constructor(props: BasicLayoutProps) {
        super(props);

        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.onUserMenuItemClick = this.onUserMenuItemClick.bind(this);
        this.setUIContextState = this.setUIContextState.bind(this);

        this.state = {
            isLoading: true,
            uiState: {
                state: {
                    isSideMenuFolded: false,
                    currentMenuItem: null
                },
                setState: this.setUIContextState
            }
        };
    }

    setUIContextState(state: UIState) {
        this.setState({ uiState: { state: { ...this.state.uiState.state, ...state }, setState: this.setUIContextState } });
    }

    componentDidMount() {
        const { history } = this.props;
        const context: SessionContextValue = this.context;
        const { session, changeState } = context;

        if (!session.isLoggedIn) {
            const localSession = getSession();
            if (localSession.sessionId) {
                getUserInfo(localSession.sessionId).then(res => {
                    if (res.statusCode != 200) {
                        setSession(null);
                        history.push('/login');
                        return;
                    }

                    const newSession: SessionInfo = {
                        isLoggedIn: true,
                        sessionId: localSession.sessionId,
                        userInfo: {
                            id: res.body.id,
                            displayName: res.body.displayName
                        },
                        permissionNodes: res.body.permissions
                    };
                    changeState(newSession);
                    
                    this.setState({isLoading: false});
                });
                return;
            }
            setSession(null);
            history.push('/login');
            return;
        }

        this.setState({isLoading: false});
    }
    
    onMenuItemClick(e: ClickParam): void {
        const { history } = this.props;

        const link = e.key;

        history.push(link);
    }

    onUserMenuItemClick(e: ClickParam): void {
        const { history } = this.props;
        const context: SessionContextValue = this.context;
        const { changeState } = context;

        const cmd = e.key;

        switch (cmd) {
            case 'logout':
                setSession(null);
                changeState({ isLoggedIn: false });
                history.push('/login');
                return;
        }
    }

    render() {
        const { routes } = this.props;
        const { isSideMenuFolded } = this.state.uiState.state;

        if (this.state.isLoading) {
            return <Skeleton active />;
        }

        return(
            <Layout style={{minHeight: '100%'}}>
                <UIContext.Provider value={this.state.uiState}>
                    <SideMenu onItemClick={this.onMenuItemClick} />
                    <Layout style={{marginLeft:isSideMenuFolded ? 80 : 256}}>
                        <ControlPanelHeader onUserMenuItemClick={this.onUserMenuItemClick} />
                        <Content style={{marginTop: 64}}>
                            <div className={styles.mainContent}>
                                <Switch>
                                    {
                                        getRoutes(routes)
                                    }
                                </Switch>
                            </div>
                        </Content>
                    </Layout>
                </UIContext.Provider>
            </Layout>
        );
    }
};