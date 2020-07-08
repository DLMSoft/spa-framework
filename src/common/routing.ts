import { Component } from "react";
import loadComponent, { Loader } from "./loadComponent";
import Loading from "../components/Loading";

function onDenied(p: string) : void {

}

function newId(): string {
    return Math.random().toString(16).substr(2, 8);
}

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
        permission: 'admin',
        component: makeRoute(() => import('../pages/tests/Test2'))
    },
    '/test3': {
        permission: 'admin',
        component: makeRoute(() => import('../pages/tests/Test3'))
    }
};
