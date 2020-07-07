import React, { Component } from 'react';
import { Switch, Route, RouteComponentProps } from 'react-router';

import './pages/common.css';

import Error404 from './pages/Errors/Error404';
import { routes } from './common/routing';
import SessionContext, { SessionContextValue, SessionInfo } from './contexts/SessionContext';
import UIContext, { UIContextValue } from './contexts/UIContext';
import UserLayout from './layouts/UserLayout';
import BasicLayout from './layouts/BasicLayout';
import LoginPage from './pages/login';


export default class App extends Component<RouteComponentProps, SessionContextValue> {
    constructor(props: any) {
        super(props);

        this.changeSessionState =  this.changeSessionState.bind(this);

        this.state = {
            session: {
                isLoggedIn: false
            },
            changeState: this.changeSessionState
        };
    }

    changeSessionState(state: SessionInfo): void {
        this.setState({ session: state });
    }

    render() {
        return (
            <SessionContext.Provider value={this.state}>
                <Switch>
                    <Route path="/login" render={props => <UserLayout><LoginPage {...this.props} /></UserLayout>} />
                    <Route path="/" render={props => <BasicLayout routes={routes} {...props} />} />
                </Switch>
            </SessionContext.Provider>
        );
    }
};
