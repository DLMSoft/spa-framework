import React, { Component } from 'react';
import { Card, Form, Input, Button, Checkbox, notification, Skeleton } from 'antd';
import * as Icons from '@ant-design/icons';

import { setSession, getSession } from '../common/httpUtils';

import { userLogin, getUserInfo, ILoginInput } from '../api/login';
import { BasePageProps } from '../common/props';

import SessionContext, { SessionContextValue, SessionInfo } from '../contexts/SessionContext';

import styles from './login.less';

const { Item: FormItem } = Form;

function LoginForm({loading, onSubmit}) {
    function onFormSubmit(values) {
        if (onSubmit)
            onSubmit(values);
    }

    return (
        <Form name="login" onFinish={onFormSubmit} initialValues={{rememberPassword: true}}>
            <FormItem name="userName" rules={[{required: true, message: '请输入用户名！'}]}>
                <Input placeholder="用户名" prefix={<Icons.UserOutlined/>} autoFocus />
            </FormItem>
            <FormItem name="password" rules={[{required: true, message: '请输入密码！'}]}>
                <Input.Password placeholder="密码" prefix={<Icons.LockOutlined/>} />
            </FormItem>
            <FormItem name="rememberPassword" valuePropName="checked">
                <Checkbox>记住密码</Checkbox>
            </FormItem>
            <FormItem>
                <Button type="primary" block htmlType="submit" loading={loading}>登录</Button>
            </FormItem>
        </Form>
    );
}

interface LoginPageState {
    isLoading: boolean;
    isSubmitting: boolean;
};

interface LoginPageProps extends BasePageProps {
    
};

export default class LoginPage extends Component<LoginPageProps, LoginPageState> {
    static contextType = SessionContext;

    constructor(props: any) {
        super(props);

        this.state = {
            isLoading: true,
            isSubmitting: false
        };

        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    componentDidMount() {
        const { history } = this.props;
        const context: SessionContextValue = this.context;
        const { session, changeState } = context;

        if (session.isLoggedIn) {
            history.push('/');
            return;
        }

        const localSession = getSession();
        if (localSession?.sessionId) {
            getUserInfo(localSession.sessionId).then(res => {
                if (res.statusCode != 200) {
                    setSession(null);
                    this.setState({isLoading: false});
                    return;
                }

                const newSession: SessionInfo = {
                    isLoggedIn: true,
                    sessionId: localSession.sessionId,
                    userInfo: {
                        id: res.body.id,
                        displayName: res.body.displayName
                    },
                    permissionNodes: res.body.permissions
                };
                changeState(newSession);
            });
            return;
        }

        this.setState({isLoading: false});
    }

    onFormSubmit(values: ILoginInput) {
        const { history } = this.props;
        const context: SessionContextValue = this.context;
        const { changeState } = context;

        this.setState({isSubmitting: true});
        setTimeout(() => {
            userLogin(values).then(response => {
                if (response.statusCode != 201) {
                    notification.error({
                        message: response.body.error
                    });
                    this.setState({isSubmitting: false});
                    return;
                }
                notification.success({
                    message: '登录成功！'
                });
                setSession({
                    sessionId: response.body.sessionId,
                    userId: response.body.id
                });
                const newSession: SessionInfo = {
                    isLoggedIn: true,
                    sessionId: response.body.sessionId,
                    userInfo: {
                        id: response.body.id,
                        displayName: response.body.displayName
                    },
                    permissionNodes: response.body.permissions
                };
                changeState(newSession);
                history.push('/');
            });
        }, 200);
    }

    render() {
        if (this.state.isLoading) {
            return <Skeleton active />;
        }
        return (
            <div className={styles.loginBox}>
                <h1>系统登录</h1>
                <Card bordered={false}>
                    <LoginForm loading={this.state.isSubmitting} onSubmit={this.onFormSubmit}/>
                </Card>
            </div>
        );
    }
};