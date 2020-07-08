import React, { Component } from "react";
import loadComponent, { Loader } from "./loadComponent";
import Loading from "../components/Loading";

function makeRoute(loader: Loader): any {
    return loadComponent(loader, { fallback: Loading });
}

export const routes = {
    '/': {
        component: makeRoute(() => import('../pages/index'))
    },
    '/test1': {
        component: makeRoute(() => import('../pages/tests/Test1'))
    },
    '/test2': {
        component: makeRoute(() => import('../pages/tests/Test2'))
    },
    '/test3': {
        component: makeRoute(() => import('../pages/tests/Test3'))
    }
};
