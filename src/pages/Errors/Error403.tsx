import React, { Component } from 'react';
import { Layout } from 'antd';

import styles from './style.less';

const { Content } = Layout;

export default function Error403() {
    return (
        <div className={styles.container}>
            <div className={styles.errorBox}>
                <h1>403</h1>
                <p>访问被拒绝。</p>
            </div>
        </div>
    );
}