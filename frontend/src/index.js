import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Route, Router, browserHistory } from '../node_modules/react-router';



import './index.css'
import Main from './Views/Main'
import Login from './Views/Login'// component đăng nhập
import Register from './Views/Register'// component đăng ký
import Drawer from './Components/Drawer'

// danh sách component các option của thanh công cụ
import Dashboard from './Dashboard/Dashboard'
import Orders from './Orders/Orders'
import Customers from './Customers/Customers'
import Reports from './Reports/Report'
import Acticity from './Activity/Activity'
import Products from './Products/Products'
import Deals from './Deals/Deal'
import Contacts from './Contacts/Contacts'
import Accounts from './Accounts/Accounts'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
        <Route exact path="/" component={Main} />
        <Route exact path="/Login/:id" component={Login} />
        <Route exact path="/Register/:id" component={Register} />
        <Route exact path="/Drawer/:id" component={Drawer} />


        <Route exact path="/Dashboard/:id" component={Dashboard} />
        <Route exact path="/Orders/:id" component={Orders} />
        <Route exact path="/Customers/:id" component={Customers} />
        <Route exact path="/Reports/:id" component={Reports} />
        <Route exact path="/Acticity/:id" component={Acticity} />
        <Route exact path="/Products/:id" component={Products} />
        <Route exact path="/Deals/:id" component={Deals} />
        <Route exact path="/Contacts/:id" component={Contacts} />
        <Route exact path="/Accounts/:id" component={Accounts} />
    </BrowserRouter>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
