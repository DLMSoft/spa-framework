import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout, Skeleton, Modal } from 'antd';
import * as Icons from '@ant-design/icons';

import { getSession, setSession } from '../common/httpUtils';
import SideMenu from '../components/SideMenu';
import ControlPanelHeader from '../components/ControlPanelHeader';
import { BasePageProps } from '../common/props';
import { getUserInfo, userLogout } from '../api/login';

import styles from './BasicLayout.less';
import { ClickParam } from 'antd/lib/menu';
import UIContext, { UIState, UIContextValue } from '../contexts/UIContext';
import SessionContext, { SessionInfo, SessionContextValue } from '../contexts/SessionContext';
import Error404 from '../pages/Errors/Error404';
import ControlPanelBanner from '../components/ControlPanelBanner';
import menu from '../common/menu';

const { Content } = Layout;
const { confirm } = Modal;

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

function findMenuParentKey(key: string) {
    const found = menu.filter(s => (s.items.filter(i => i.link == key).length > 0));
    if (found.length == 0)
        return null;

    return found[0].key;
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
                    sideMenuOpenKey: null,
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

        const key = location.pathname;
        const openKey = findMenuParentKey(key);

        this.setUIContextState({
            sideMenuOpenKey: [openKey],
            currentMenuItem: key
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
        const { session, changeState } = context;

        const cmd = e.key;

        switch (cmd) {
            case 'logout':
                confirm({
                    title: '注销登录',
                    content: '确定要退出当前登录的账号吗？',
                    icon: <Icons.QuestionCircleOutlined />,
                    cancelText: '取消',
                    okText: '确定',
                    onOk() {
                        userLogout(session.sessionId);
                        setSession(null);
                        changeState({ isLoggedIn: false });
                        history.push('/login');
                    }
                });
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