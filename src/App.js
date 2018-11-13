import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import {LoginPageContainer} from './container/LoginPaneContainer';
import { store } from './store/MainStore';
import { Route, Router } from 'react-router-dom'
import History from './history'
import {HomeContainer} from './container/HomeContainer'
import {UserIsAuthenticated} from './utils/index'

const App = () => (
    <Provider store={store}>
        <Router history={History}>
            <div>
                <Route exact path="/" component={LoginPageContainer}>
                </Route>
                <Route path="/home" component={UserIsAuthenticated(HomeContainer)}>

                </Route>
            </div>
        </Router>
    </Provider>
)
export default App;