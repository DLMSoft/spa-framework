import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';

export interface BasePageProps extends RouteComponentProps {
    dispatch?: Dispatch
};