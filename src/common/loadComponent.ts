import React, { Component } from 'react';
import Loading from '../components/Loading';
import { Module } from 'webpack';

const loadedComponents = new Map<string, any>();

export interface LoadOptions {
    loadingComponent?: any;
    delay?: number;
    onLoadFailed?: (ex: any) => void;
    onDenied?: (p: string) => void;
    permissionNodes?: string[];
};

export default function loadComponent(opt: LoadOptions) {
    const options : LoadOptions = {
        loadingComponent: Loading,
        delay: 200,
        onLoadFailed: null,
        onDenied: null,
        permissionNodes: [],
        ...opt
    };

    return function Loadable(id: string, loader: () => Promise<any>) {
        return class LoadableComponent extends Component {
            constructor(props : any) {
                super(props);

                this.state = {
                    waiting: true,
                    loading: true,
                    loaded: null,
                    error: null
                };
            }

            componentDidMount() {
                const { delay, onDenied, onLoadFailed, permissionNodes } = options;
                if (loadedComponents.has(id)) {
                    this.setState({ loading: false, waiting: false, loaded: loadedComponents[id] });
                    return;
                }
                setTimeout(() => this.setState({ waiting: false }), delay);

                const promise = loader();
                promise.then(m => {
                    const component = m.default;
                    if (permissionNodes && permissionNodes.length > 0 && component.hasOwnProperty('permissionNode') && component.permissionNode) {
                        if (permissionNodes.indexOf(component.permissionNode) == -1) {
                            onDenied(component.permissionNode);
                            return;
                        }
                    }
                    loadedComponents[id] = m.default;
                    this.setState({ loading: false, loaded: m.default });
                }).catch(ex => {
                    onLoadFailed(ex);
                });
            }

            render() {
                const { loadingComponent } = options;
                if (this.state['waiting'] || this.state['loading']) {
                    return React.createElement(loadingComponent);
                }
                return React.createElement(this.state['loaded'], this.props);
            }
        }
    }
}