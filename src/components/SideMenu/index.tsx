import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Sider } = Layout;
const { Item: MenuItem, SubMenu } = Menu;

import menu from '../../common/menu';

import styles from './style.less';
import { Lifter } from '../../common/hoc-lifeter';
import { ClickParam } from 'antd/lib/menu';
import SessionContext from '../../contexts/SessionContext';

export interface SideMenuProps {
    onItemClick: (e: ClickParam) => void;
    dispatch?: (aciton: object) => void;
}

export default function (props: SideMenuProps) {
    const { onItemClick } = props;
    const { isSideMenuFolded } = ui;

    return (
        <Sider className={styles.sider} style={{display: isSideMenuFolded ? 'none' : null}} width={256}>
            <div className={styles.logo}>
                <Link to="/">
                    SITE TITLE HERE
                </Link>
            </div>
            <SessionContext.Consumer>
                {({session}) => (
                    <Menu onClick={e => { if (onItemClick) onItemClick(e); }} mode="inline" theme="dark">
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
    );
};