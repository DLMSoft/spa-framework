import React, { Component } from 'react';
import { Button, Card, Divider } from 'antd';
import * as Icons from '@ant-design/icons';
import { PermissionControl } from '../../components/PermissionControl';

export default class Test3Page extends Component {
    render() {
        return (
            <Card>
                <PermissionControl required="test3.write" fallback="You have no permission to Edit">
                    <div>
                        <Button type="primary" icon={<Icons.PlusOutlined/>}>新增</Button>
                        <Divider type="vertical" />
                        <Button icon={<Icons.EditOutlined/>}>修改</Button>
                        <Divider type="vertical" />
                        <Button icon={<Icons.DeleteOutlined/>}>删除</Button>
                    </div>
                </PermissionControl>
                <p>Content of test page 3.</p>
            </Card>
        );
    }
}