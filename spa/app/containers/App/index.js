/**
 *
 * App
 *
 */

import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import injectSaga from '../../utils/injectSaga';
import saga from './saga';

class App extends React.Component {
    render() {
        return (
            <div>
                <div>hi</div>
            </div>
        );
    }
}

const withSaga = injectSaga({ key: 'app', saga });



export default compose(withSaga, withRouter)(App);
