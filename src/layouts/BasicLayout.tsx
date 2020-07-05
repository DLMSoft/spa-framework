import React, { Component } from 'react';
import { Layout } from 'antd';

import SideMenu from '../components/SideMenu';

import styles from './style.less';

const { Sider, Header, Content } = Layout;

export default class BasicLayout extends Component {
    render() {
        return(
            <Layout style={{minHeight: '100%'}}>
                <SideMenu />
                <Layout>
                    <Header className={styles.header}>Header</Header>
                    <Content>
                        Content
                    </Content>
                </Layout>
            </Layout>
        );
    }
}