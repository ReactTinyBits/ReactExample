import { Route, RouteProps } from 'react-router-dom';
import React from 'react';

import EmployeeInfoRoute from '../containers/Routes/EmployeeInfoRoute';
import BasicLayout from "../layouts/BasicLayout";
import {EmployeeInfoPage} from "../containers/EmployeeInfoPage";

const AppRouting: LayoutRouteComponent[] = [
    {
        layout: BasicLayout,
        exact: true,
        subroutes: [
            {
                path: '/',
                exact: true,
                route: EmployeeInfoRoute,
                component: EmployeeInfoPage,
            },
        ],
    },
];

type RouteComponent = { route: React.FC<any> | typeof Route } & RouteProps;

type LayoutRouteComponent = {
    layout: React.ReactNode;
    subroutes: RouteComponent[];
} & RouteProps;

export default AppRouting;
