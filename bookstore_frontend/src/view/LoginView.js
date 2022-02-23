import React from 'react';
import WrappedLoginForm from '../components/form/LoginForm';
import '../css/login.css';

class LoginView extends React.Component{
    render(){
        return(
            <div className="login-page">
                <div className="login-container">
                    <div className="login-box">
                        <h1>Login</h1>
                        <div className="login-content">
                            <WrappedLoginForm />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginView;