import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Route, Router, browserHistory } from '../node_modules/react-router';


import './index.css'
import Main from './Views/Main'
import Login from './Views/Login'// component đăng nhập
import Register from './Views/Register'// component đăng ký

// danh sách tap trong main
import Introduce from './Views/Introduce' // giới thiệu
import ContactMain from './Views/ContactMain' // liên hệ vs CRM
import InformationEvent from './Views/InformationEvent' // tin tức sự kiện
import ActivityMain from './Views/Activity' // các hoạt động

// danh sách component các option của thanh công cụ
import Dashboard from './Dashboard/Dashboard'
import Orders from './Orders/Orders'
import Customers from './Customers/Customers'
import Reports from './Reports/Report'
import Activity from './Activity/Activity'
import Products from './Products/Products'
import Deals from './Deals/Deal'
import Contacts from './Contacts/Contacts'
import Accounts from './Accounts/Accounts'
import AddCustomer from './Customers/AddCustomer'
import ViewMail from './Contacts/ViewMail'
import Maketing from './Maketing/Maketing'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/> 
        <Route exact path="/" component={Main} />
        <Route exact path="/Login/:id" component={Login} />
        <Route exact path="/Register/:id" component={Register} />
        <Route exact path="/Introduce/:id" component={Introduce} />
        <Route exact path="/ContactMain/:id" component={ContactMain} />
        <Route exact path="/InformationEvent/:id" component={InformationEvent} />
        <Route exact path="/ActivityMain/:id" component={ActivityMain} />


        <Route exact path="/Dashboard/:id" component={Dashboard} />
        <Route exact path="/Orders/:id" component={Orders} />
        <Route exact path="/Customers/:id" component={Customers} />
        <Route exact path="/Reports/:id" component={Reports} />
        <Route exact path="/Activity/:id" component={Activity} />
        <Route exact path="/Products/:id" component={Products} />
        <Route exact path="/Deals/:id" component={Deals} />
        <Route exact path="/Contacts/:id" component={Contacts} />
        <Route exact path="/Accounts/:id" component={Accounts} />
        <Route exact path="/AddCustomer/:id" component={AddCustomer} />
        <Route exact path="/ViewMail/:id" component={ViewMail} />
        <Route exact path="/Maketing/:id" component={Maketing} />
    </BrowserRouter>, document.getElementById('root')
);
// import enviroment:
require('dotenv').config();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
