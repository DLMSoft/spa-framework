import React, { Component } from 'react';
import { Layout, Menu, Row, Col, Popconfirm } from 'antd';
import * as Icons from '@ant-design/icons';

import styles from './style.less';
import SessionContext from '../../contexts/SessionContext';
import { Lifter } from '../../common/hoc-lifeter';

const { Header } = Layout;

const { SubMenu, Item: MenuItem, Divider } = Menu;

export default function(props: any) {
    const { ui, dispatch, onUserMenuItemClick } = props;
    const { isSideMenuFolded } = ui;

    const onToggleMenuClick = () => {
        dispatch({type: 'ui/toggleMenu'});
    };

    return (
        <Header className={styles.header} style={{width: isSideMenuFolded ? '100%' : 'calc(100% - 256px)'}}>
            <a className={styles.toggleMenu} onClick={onToggleMenuClick} title={isSideMenuFolded ? '显示菜单' : '隐藏菜单'}>
                {isSideMenuFolded ? <Icons.MenuUnfoldOutlined /> : <Icons.MenuFoldOutlined />}
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
    );
};