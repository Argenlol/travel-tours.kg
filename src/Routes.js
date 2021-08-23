import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/Header/Navbar';
import Body from './components/Body/Body';
import Add from './components/Admin/Add';
import TourContextProvider from './components/Contexts/TourContext';

import Edit from './components/Admin/Edit';
import AdminPanell from './components/Admin/AdminPanell';
import Cart from './components/Cart/Cart';
import Login from './components/Authorization/Login';
import Registration from './components/Authorization/Registration';
import AuthContextProvider from './components/Contexts/AuthContextProvider';
import TourDetail from './components/Tours/TourDetail';
import Card from './components/CreditCard/Card'
import TourList2 from './components/TourList2/TourList2';
import AboutUs from './components/Header/AboutUs';





const Routes = () => {
    return (

        <AuthContextProvider>
            <TourContextProvider>
                <BrowserRouter>
                    <Navbar />
                    {/* <Body ></Body> */}
                    <Switch>
                        <Route exact path="/" component={Body} />
                        <Route exact path="/cart" component={Cart} />
                        <Route exact path="/list" component={TourList2} />
                        <Route exact path="/admin" component={AdminPanell} />
                        <Route exact path="/edit/:id" component={Edit} />

                        <Route exact path="/login" component={Login} />
                        <Route exact path="/registration" component={Registration} />

                        <Route exact path='/card' component={Card} />

                        <Route exact path='/detail/:id' component={TourDetail} />
                        <AboutUs />
                    </Switch>
                </BrowserRouter>
            </TourContextProvider>

        </AuthContextProvider>
    );
};

export default Routes;