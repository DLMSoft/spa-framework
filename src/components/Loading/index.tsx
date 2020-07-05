import React from 'react';
import { Loading3QuartersOutlined } from '@ant-design/icons';

export default function Loading(text: string = 'Loading ...') {
    return (
        <div>
            <Loading3QuartersOutlined spin /> {text}
        </div>
    );
}