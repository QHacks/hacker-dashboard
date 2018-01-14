import { Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import React, { Component } from 'react';

/**
 * This component is used to render a collection of of <PrivateRoute> components as children.
 * This Switch only renders the <PrivateRoute> components which match the current authorization type.
 * This also renders all children that are not of type <PrivateRoute>.
 */
export default class AuthSwitch extends Component {

    render() {
        const { type: authType, children, ...rest } = this.props;
        if (!authType) throw Error('You cannot use <AuthSwitch> without specifying an auth type');

        const childs = [];
        React.Children.forEach(children, (element) => {
            if (React.isValidElement(element)) {
                const { type: elementAuthType } = element.props;

                if (element.type !== PrivateRoute || (element.type === PrivateRoute && elementAuthType === authType)) {
                    childs.push(element);
                }
            }
        });

        return (
            <Switch {...rest}>
                {childs}
            </Switch>
        );
    }
}
