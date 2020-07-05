import React, { Component } from 'react';
import { Layout } from 'antd';

import styles from './style.less';

const { Content } = Layout;

export default function Error404() {
    return (
        <div className={styles.container}>
            <div className={styles.errorBox}>
                <h1>404</h1>
                <p>找不到指定页面</p>
            </div>
        </div>
    );
}