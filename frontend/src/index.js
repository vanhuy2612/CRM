import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Route, Router, browserHistory } from '../node_modules/react-router';



import './index.css'
import Main from './Views/Main'
import Login from './Views/Login'
import Register from './Views/Register'
import Dashboard from './Dashboard/Dashboard'
import Orders from './Orders/Orders'
import Customers from './Customers/Customers'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
        <Route exact path="/" component={Main} />
        <Route exact path="/Login/:id" component={Login} />
        <Route exact path="/Register/:id" component={Register} />
        <Route exact path="/Dashboard/:id" component={Dashboard} />
        <Route exact path="/Orders/:id" component={Orders} />
        <Route exact path="/Customers/:id" component={Customers} />
    </BrowserRouter>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
