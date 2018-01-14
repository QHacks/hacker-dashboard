import { Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import React, { Component } from 'react';

class AuthSwitch extends Component {

    render() {
        const { type: authType, children, ...rest } = this.props;

        if (!authType) throw Error('You cannot use <AuthSwitch> without specifying an auth type!');

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

export default AuthSwitch;
