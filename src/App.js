import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import LoginPane from './component/LoginPane';
import { store } from './store/MainStore';
import { Route, Router } from 'react-router-dom'
import History from './history'
import Home from './component/Home'

const App = () => (
    <Provider store={store}>
        <Router history={History}>
            <div>
                <Route exact path="/" component={LoginPane}>
                </Route>
                <Route path="/home" component={Home}>

                </Route>
            </div>
        </Router>
    </Provider>
)
export default App;