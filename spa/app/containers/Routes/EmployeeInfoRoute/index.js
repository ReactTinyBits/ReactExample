import React from 'react';
import { Route } from 'react-router-dom';

const EmployeeInfoRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                return <Component {...props} />;
            }}
        />
    );
};

export default EmployeeInfoRoute;
