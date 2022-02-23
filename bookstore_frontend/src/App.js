import React from 'react';
import './App.css';
import BasicRoute from "./Router";
import LoginView from "./view/LoginView"
import HomeView from "./view/HomeView"
import BookView from "./view/BookView"
import CartView from "./view/CartView"
import ProfileView from "./view/ProfileView"
import UserView from "./view/UserView"
import OrderView from "./view/OrderView"
import AdminBookView from "./view/AdminBookView"

class App extends React.Component {

  render() {
    return (
      <BasicRoute/>
    );
  }
}

export default App;
