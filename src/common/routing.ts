import { Component } from "react";
import loadComponent from "./loadComponent";

let permissionNodes: string[] = null;

export function setPermissionNodes(nodes: string[]) {
    permissionNodes = nodes;
}

function onDenied(p: string) : void {

}

function newId(): string {
    return Math.random().toString(16).substr(2, 8);
}

function makeRoute(loader: () => Promise<any>): any {
    return loadComponent({permissionNodes, onDenied})(newId(), loader);
}

export const routes = {
    '/': {
        component: require('../layouts/BasicLayout').default
    },
    '/login/': {
        component: require('../layouts/UserLayout').default
    }
};
