import React, { Component } from 'react';
import { Result } from 'antd';

import styles from './style.less';

export default function Error403() {
    return (
        <Result
            status="403"
            title="403"
            subTitle="Access denied."
        />
    );
}