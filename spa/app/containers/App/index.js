/**
 *
 * App
 *
 */

import React from 'react';
import {Route, withRouter, Switch} from 'react-router-dom';
import { compose } from 'redux';
import injectSaga from '../../utils/injectSaga';
import saga from './saga';
import AppRouting from "../../routing";
import flatten from 'lodash/flatten';

class App extends React.Component {
    render() {
        return (
            <div>
                <div>hi</div>
                <Switch>
                    {AppRouting.map(route => {
                        const { layout: Layout, exact } = route;
                        const path = flatten(route.subroutes.map(subroute => subroute.path));
                        return (
                            <Route key={path.join()} exact={exact} path={path}>
                                <Layout>
                                    <Switch>
                                        {route.subroutes.map(subroute => {
                                            const Subroute = subroute.route;
                                            return <Subroute key={subroute.path} {...subroute} />;
                                        })}
                                    </Switch>
                                </Layout>
                            </Route>
                        );
                    })}
                </Switch>
            </div>
        );
    }
}

const withSaga = injectSaga({ key: 'app', saga });



export default compose(withSaga, withRouter)(App);
