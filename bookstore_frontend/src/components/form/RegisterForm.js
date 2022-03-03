import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import {Link} from 'react-router-dom'
import 'antd/dist/antd.css';
import '../../css/login.css'
import * as userService from '../../services/userService'

class RegisterForm extends React.Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(!err) {
                if(values.password !== values._password){
                    message.error("密码不一致！");
                }
                else{
                    console.log('Received values of form: ', values);
                    userService.signup(values);
                }
            }
        })
    }

    handleUserName = e => {
        console.log(e.target.value);
        userService.checkUserName(e.target.value);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return(
        <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
            {getFieldDecorator('email', {
                        rules: [{pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
                            message: '邮箱格式不正确',},
                            {max: 50,message: '邮箱不得超过50字符'},
                            { required: true, message: 'Please input your E-mail!' }],
            })(
                <Input
                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="E-mail"
                />,
            )}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please input your username!' }],
            })(
                <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="Username"
                    onBlur={this.handleUserName}
                />,
            )}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
            })(
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Password"
                />,
            )}
            </Form.Item>
            <Form.Item>
            {getFieldDecorator('_password', {
                rules: [{ required: true, message: 'Please input your Password again!' }],
            })(
                <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="Confirm Password"
                />,
            )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                })(<Checkbox>Remember me</Checkbox>)}
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Register
                </Button>
                Or <Link to="/login">login now!</Link>
            </Form.Item>
        </Form>
        )
    }
}

const WrappedRegisterForm = Form.create({ name: 'normal_login' })(RegisterForm);

export default WrappedRegisterForm