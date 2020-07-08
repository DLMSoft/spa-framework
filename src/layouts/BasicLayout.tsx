import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, Skeleton } from 'antd';

import { getSession, setSession } from '../common/httpUtils';
import SideMenu from '../components/SideMenu';
import ControlPanelHeader from '../components/ControlPanelHeader';
import { BasePageProps } from '../common/props';
import { getUserInfo } from '../api/login';

import styles from './BasicLayout.less';
import { ClickParam } from 'antd/lib/menu';
import UIContext, { UIState, UIContextValue } from '../contexts/UIContext';
import SessionContext, { SessionInfo, SessionContextValue } from '../contexts/SessionContext';
import Error404 from '../pages/Errors/Error404';
import ControlPanelBanner from '../components/ControlPanelBanner';

const { Content } = Layout;

function getRoutes(routes: Object) {
    const result = [];

    for (const path in routes) {
        if (!routes.hasOwnProperty(path))
            continue;
        if (path == '/') {
            result.push(<Route exact key={path} path={path} component={routes[path].component} />);
            continue;
        }
        result.push(<Route key={path} path={path} component={routes[path].component} />);
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
                    currentMenuItem: '/'
                },
                setState: this.setUIContextState
            }
        };
    }

    setUIContextState(state: UIState) {
        this.setState({ uiState: { state: { ...this.state.uiState.state, ...state }, setState: this.setUIContextState } });
    }

    componentDidMount() {
        const { history, location } = this.props;
        const context: SessionContextValue = this.context;
        const { session, changeState } = context;

        this.setUIContextState({
            currentMenuItem: location.pathname
        });
        history.listen(({pathname}) => {
            this.setUIContextState({
                currentMenuItem: pathname
            });
        });

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
        const { routes, location } = this.props;
        const { isSideMenuFolded } = this.state.uiState.state;

        if (this.state.isLoading) {
            return <Skeleton active />;
        }

        return(
            <Layout style={{minHeight: '100%'}}>
                <UIContext.Provider value={this.state.uiState}>
                    <ControlPanelBanner onUserMenuItemClick={this.onUserMenuItemClick} />
                    <Layout style={{marginTop: 64}}>
                        <SideMenu onItemClick={this.onMenuItemClick} />
                        <Layout style={{marginLeft:isSideMenuFolded ? 80 : 256}}>
                            <ControlPanelHeader path={location.pathname} />
                            <Content style={{marginTop: 64}}>
                                <div className={styles.mainContent}>
                                    <Switch>
                                        {
                                            getRoutes(routes)
                                        }
                                        <Route component={Error404}/>
                                    </Switch>
                                </div>
                            </Content>
                        </Layout>
                    </Layout>
                </UIContext.Provider>
            </Layout>
        );
    }
};