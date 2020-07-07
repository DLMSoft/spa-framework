import React, { Component } from 'react';
import { Card } from 'antd';
import { permission } from '../../common/decorators';

@permission('admin')
export default class Test2Page extends Component {
    render() {
        return (
            <Card>
                <p>Content of test page 2.</p>
            </Card>
        );
    }
}