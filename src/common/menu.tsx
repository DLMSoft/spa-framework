import React from 'react';
import * as Icons from '@ant-design/icons';

export default [
    {
        key: 'test-1',
        label: 'Test 001',
        icon: <Icons.FolderOutlined />,
        items: [
            {
                label: 'Test Page',
                link: '/test1',
                icon: <Icons.FileOutlined />
            }
        ]
    },
    {
        key: 'test-2',
        label: 'Test 002',
        icon: <Icons.FolderOutlined />,
        permission: 'test2',
        items: [
            {
                label: 'Test Page',
                link: '/test2',
                icon: <Icons.FileOutlined />
            }
        ]
    },
    {
        key: 'test-3',
        label: 'Test 003',
        icon: <Icons.FolderOutlined />,
        permission: 'test3',
        items: [
            {
                label: 'Test Page',
                link: '/test3',
                icon: <Icons.FileOutlined />
            }
        ]
    }
]