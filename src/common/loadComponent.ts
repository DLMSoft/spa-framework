import React, { Component, FunctionComponent, ComponentClass } from 'react';

export interface LoadOptions {
    fallback?: ComponentClass|FunctionComponent|string;
    delay?: number;
};

export type Loader = () => Promise<any>;

export interface LoadableState {
    isLoaded: boolean;
    loader: Loader;
    component?: ComponentClass | FunctionComponent | null;
};

export default function loadComponent(loader: Loader, opt: LoadOptions): ComponentClass|FunctionComponent {
    const options : LoadOptions = {
        fallback: 'Loading ...',
        delay: 200,
        ...opt
    };

    return class extends Component<any, LoadableState> {
        constructor(props: any) {
            super(props);

            this.state = {
                isLoaded: false,
                loader
            }
        }

        componentDidMount() {
            setTimeout(() => {
                loader().then(m => {
                    const componentClass = m.default;
                    this.setState({isLoaded: true, component: componentClass});
                });
            }, options.delay);
        }

        render() {
            if (!this.state.isLoaded)
                return React.createElement(options.fallback);
            return React.createElement(this.state.component);
        }
    }
}