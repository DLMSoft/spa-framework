import React, { Component } from 'react';
import { Card } from 'antd';
import {withPermission} from '../../components/PermissionControl';
import Error403 from '../Errors/Error403';

export default withPermission('test2', {fallback:<Error403 />})(
    class Test2Page extends Component {
        render() {
            return (
                <Card>
                    <p>Content of test page 2.</p>
                </Card>
            );
        }
    }
);