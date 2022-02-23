import React from 'react';
import WrappedRegisterForm from '../components/form/RegisterForm';
import '../css/login.css';

class RegisterView extends React.Component{
    render(){
        return(
            <div className="login-page">
                <div className="register-container">
                    <div className="login-box">
                        <h1>Register</h1>
                        <div className="login-content">
                            <WrappedRegisterForm />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterView;