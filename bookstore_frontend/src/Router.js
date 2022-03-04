import React from 'react';
import { Router, Switch, Redirect } from 'react-router-dom';
import {history} from "./utils/history";
import PrivateRoute from './route/PrivateRoute';
import LoginRoute from './route/LoginRoute';
import AdminRoute from './route/AdminRoute';
import LoginView from "./view/LoginView";
import RegisterView from "./view/RegisterView";
import HomeView from "./view/HomeView";
import BookView from "./view/BookView";
import AdminBookView from "./view/AdminBookView";
import CartView from "./view/CartView";
import OrderView from "./view/OrderView";
import ProfileView from "./view/ProfileView";
import UserView from "./view/UserView";
import AdminStatisticView from './view/AdminStatisticView';
import StatisticView from './view/StatisticView';

class BasicRoute extends React.Component{

    constructor(props){
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            console.log(location,action);
        });
    }

    render(){
        return(
            <Router history={history}>
                <Switch>
                    <LoginRoute exact path="/login" component={LoginView} />
                    <LoginRoute exact path="/register" component={RegisterView} />
                    <PrivateRoute exact path="/" component={HomeView} />
                    <PrivateRoute exact path="/bookDetails" component={BookView} />
                    <PrivateRoute exact path="/cart" component={CartView} />
                    <PrivateRoute exact path="/order" component={OrderView} />
                    <PrivateRoute exact path="/profile" component={ProfileView} />
                    <PrivateRoute exact path="/statistic" component={StatisticView} />
                    <AdminRoute exact path="/adminStatistic" component={AdminStatisticView} />
                    <AdminRoute exact path="/bookManage" component={AdminBookView} />
                    <AdminRoute exact path="/userManage" component={UserView} />
                    <Redirect from="/*" to="/" />
                </Switch>
            </Router>
        )
    }
}

export default BasicRoute;
