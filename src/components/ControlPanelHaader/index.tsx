import React, { Component } from 'react';
import { Layout, Menu, Row, Col, Popconfirm } from 'antd';
import * as Icons from '@ant-design/icons';

import styles from './style.less';
import SessionContext from '../../contexts/SessionContext';
import UIContext from '../../contexts/UIContext';

const { Header } = Layout;

const { SubMenu, Item: MenuItem, Divider } = Menu;

export default function(props: any) {
    const { onUserMenuItemClick } = props;

    return (
        <UIContext.Consumer>
            {({state, setState}) => (
                <Header className={styles.header} style={{width: state.isSideMenuFolded ? 'calc(100% - 80px)' : 'calc(100% - 256px)'}}>
                    <a className={styles.toggleMenu} onClick={() => {setState({ isSideMenuFolded: !state.isSideMenuFolded })}} title={state.isSideMenuFolded ? '显示菜单' : '隐藏菜单'}>
                        {state.isSideMenuFolded ? <Icons.MenuUnfoldOutlined /> : <Icons.MenuFoldOutlined />}
                    </a>
                    <SessionContext.Consumer>
                    {({session}) => (
                        <Menu triggerSubMenuAction="click" selectable={false} mode="horizontal" className={styles.userMenu} onClick={onUserMenuItemClick}>
                            <SubMenu icon={<Icons.UserOutlined />} title={session.userInfo.displayName} popupOffset={[0, 0]} popupClassName={styles.subMenu}>
                                <MenuItem key="changePassword" icon={<Icons.KeyOutlined />}>
                                    修改密码
                                </MenuItem>
                                <Divider />
                                <MenuItem key="logout" icon={<Icons.LogoutOutlined/>}>
                                    注销登录
                                </MenuItem>
                            </SubMenu>
                        </Menu>
                    )}
                    </SessionContext.Consumer>
                </Header>
            )}
        </UIContext.Consumer>
    );
};