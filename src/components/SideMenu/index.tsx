import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import * as Icon from '@ant-design/icons';

const { Sider } = Layout;
const { Item: MenuItem } = Menu;

import styles from './style.less';
import { connect } from 'react-redux';

import menu from '../../common/menu';
import SubMenu from 'antd/lib/menu/SubMenu';

@connect(({sys_user}) => ({
    sys_user
}))
export default class SideMenuComponent extends Component {
    render() {
        const { permissions } = this.props.sys_user;
        return (
            <Sider trigger={null} collapsible width={256}>
                <div className={styles.logo}>
                    <Link to="/">
                        SITE TITLE HERE
                    </Link>
                </div>
                <Menu theme="dark" mode="inline">
                    {
                        menu.filter(item => !item.permission || permissions && permissions.indexOf(item.permission) != -1).map(item => (
                            <SubMenu icon={item.icon} key={item.key} title={item.label}>
                                
                            </SubMenu>
                        ))
                    }
                </Menu>
            </Sider>
        );
    }
}