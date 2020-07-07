import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;
const { Item: MenuItem, SubMenu } = Menu;

import menu from '../../common/menu';
import { ClickParam } from 'antd/lib/menu';
import SessionContext from '../../contexts/SessionContext';
import UIContext, { UIContextValue } from '../../contexts/UIContext';

import styles from './style.less';
import logo from '../../assets/logo.jpg';

export interface SideMenuProps {
    onItemClick: (e: ClickParam) => void;
}

export default class SideMenu extends Component<SideMenuProps> {
    static contextType = UIContext;

    render() {
        const { onItemClick } = this.props;
        return (
            <UIContext.Consumer>
                {({state, setState}) => (
                    <Sider className={styles.sider} collapsed={state.isSideMenuFolded} width={256}>
                        <div className={styles.logo}>
                            <Link to="/">
                                <img src={logo} alt="DLM" height="48"/>
                                <h1>SITE TITLE HERE</h1>
                            </Link>
                        </div>
                        <SessionContext.Consumer>
                            {({session}) => (
                                <Menu selectable selectedKeys={[state.currentMenuItem]} onClick={e => { setState({ currentMenuItem: e.key }); if (onItemClick) onItemClick(e); }} mode="inline" theme="dark">
                                    {
                                        menu.filter(item => !item.permission || session.permissionNodes && session.permissionNodes.indexOf(item.permission) != -1).map(item => (
                                            <SubMenu icon={item.icon} key={item.key} title={item.label}>
                                            {
                                                item.items.map(child => (
                                                    <MenuItem key={child.link} icon={child.icon} title={child.label}>
                                                        { child.label }
                                                    </MenuItem>
                                                ))
                                            }
                                            </SubMenu>
                                        ))
                                    }
                                </Menu>
                            )}
                        </SessionContext.Consumer>
                    </Sider>
                )}
            </UIContext.Consumer>
        );
    }
}
