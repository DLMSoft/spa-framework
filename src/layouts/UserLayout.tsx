import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router';
import { Layout } from 'antd';

import styles from './UserLayout.less';
import { Route } from 'react-router';

const { Content } = Layout;

export default class UserLayout extends Component {
    render() {
        const {children} = this.props;

        return(
            <Layout className={styles.container}>
                <Content className={styles.content}>
                    {children}
                </Content>
            </Layout>
        );
    }
}