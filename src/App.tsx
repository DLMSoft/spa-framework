import React, { Component } from 'react';
import { Route, Switch } from 'react-router';

import './pages/common.css';

import Error404 from './pages/Errors/Error404';
import { routes } from './common/routing';

const BasicLayout = routes["/"].component;
const UserLayout = routes["/login/"].component;

export default function(props) {
    return (
        <Switch>
            <Route path="/login/" render={ props => <UserLayout routes={routes} {...props} /> } />
            <Route path="/" render={ props => <BasicLayout routes={routes} {...props} /> } />
            <Route component={Error404} />
        </Switch>
    );
}