import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Breadcrumb } from 'antd';
import * as Icons from '@ant-design/icons';

import UIContext from '../../contexts/UIContext';
import { siteMaps } from '../../common/site-maps';

import styles from './style.less';

const { Header } = Layout;

function getBreadcrumItems(path: string) {
    if (path == '/') {
        return (
            <Breadcrumb.Item key="/">
                {siteMaps['/'].title}
            </Breadcrumb.Item>
        );
    }

    const parts = path.split('/');
    
    let currentNode = siteMaps['/'];

    return parts.map((p, i) => {
        if (!p)
            return (
                <Breadcrumb.Item key="/">
                    <Link to="/">
                        {currentNode.title}
                    </Link>
                </Breadcrumb.Item>
            );

        currentNode = currentNode.children[p];
        
        if (i == parts.length - 1) {
            return (
                <Breadcrumb.Item key={p}>
                    {currentNode?.title || p}
                </Breadcrumb.Item>
            );
        }
    });
}

export default function(props: any) {
    const { path } = props;

    return (
        <UIContext.Consumer>
            {({state, setState}) => (
                <Header className={styles.header} style={{width: state.isSideMenuFolded ? 'calc(100% - 80px)' : 'calc(100% - 256px)'}}>
                    <a className={styles.toggleMenu} onClick={() => {setState({ isSideMenuFolded: !state.isSideMenuFolded })}} title={state.isSideMenuFolded ? '显示菜单' : '隐藏菜单'}>
                        {state.isSideMenuFolded ? <Icons.MenuUnfoldOutlined /> : <Icons.MenuFoldOutlined />}
                    </a>
                    <div className={styles.location}>
                        当前位置：
                        <Breadcrumb className={styles.breadcrumb} separator=">">
                            { getBreadcrumItems(path) }
                        </Breadcrumb>
                    </div>
                </Header>
            )}
        </UIContext.Consumer>
    );
};