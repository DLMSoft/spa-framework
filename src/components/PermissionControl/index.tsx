import React, { ReactElement, FunctionComponent, Component, ComponentClass } from 'react';
import SessionContext from '../../contexts/SessionContext';

export interface PermissionControlProps {
    required: string;
    fallback?: ReactElement | string | null;
    render?: FunctionComponent;
    children?: ReactElement | ReactElement[] | string | null;
}

export function PermissionControl(props: PermissionControlProps) {
    const {required, fallback = null, children, render} = props;

    if (!children && !render)
        throw new Error('No render function nor child elements are specified.');

    return (
        <SessionContext.Consumer>
        {({session}) => {
            const {permissionNodes} = session;

            if (!permissionNodes || permissionNodes.length == 0)
                return fallback;

            if (permissionNodes.indexOf(required) == -1)
                return fallback;

            if (render) {
                return render(props);
            }

            return children;
        }}
        </SessionContext.Consumer>
    );
}

export interface PermissionControlOptions {
    fallback?: ReactElement | string | null;
    render?: FunctionComponent;
    children?: ReactElement[];
}

export function withPermission<Props extends Object>(node: string, options?: PermissionControlOptions) {
    return function(TargetComponent: ComponentClass<Props> | FunctionComponent<Props>) {
        return function(props: Props) {
            return (
                <PermissionControl required={node} {...options}>
                    <TargetComponent {...props} />
                </PermissionControl>
            );
        }
    }
};
