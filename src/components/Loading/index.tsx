import React, { ReactElement } from 'react';
import { Spin } from 'antd';

export default function Loading({text = '载入中 ...'}:any): ReactElement {
    return (
        <div style={{textAlign: 'center'}}>
            <Spin tip={text} />
        </div>
    );
}