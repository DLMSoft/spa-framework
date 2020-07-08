import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import * as Icons from '@ant-design/icons';

import * as metrics from '../../common/metrics';
import SessionContext from '../../contexts/SessionContext';

import styles from './style.less';
import logo from '../../assets/logo.jpg';

const { SubMenu, Item: MenuItem, Divider } = Menu;

const { Header } = Layout;

export default function (props) {
    const { onUserMenuItemClick } = props;

    return (
        <Header className={styles.banner}>
            <div className={styles.logo}>
                <Link to="/">
                    <img src={logo} alt="DLM" height="48"/>
                    <h1>{metrics.siteTitle}</h1>
                </Link>
            </div>
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
}