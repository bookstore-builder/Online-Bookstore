import React from 'react'
import { Form, Icon, Input, Button, Divider, Radio, DatePicker, message } from 'antd';
import moment from 'moment';
import {UserPieChart} from "../statistic/Charts";
import '../../css/profile.css'
import head from "../../assets/head.png"
import * as userService from "../../services/userService"
import {getUserBookType} from "../../services/orderService"

const { TextArea } = Input;
const dateFormat = 'YYYY-MM-DD';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            name: "thunderboy",
            tel: "17326004258",
            description: "SJTU, CS undergraduate",
            email: "thunderboy@sjtu.edu.cn",
            sex: 1,
            birthday: '2000-09-23',
            address: "西川路800号海上交通大学",
            loading: false,
            avatar: '',
            data: [],
        };
        this.changeValue = this.changeValue.bind(this);
    }

    componentDidMount() {
        let user = localStorage.getItem("user");
        let userId = JSON.parse(user).userId;
        this.setState({ userId: userId });
        const callback = (data) => {
            this.setState({
                name: data.name,
                tel: data.tel,
                description: data.description,
                birthday: data.birthday,
                email: data.email,
                sex: data.sex,
                address: data.address,
            });
        };
        userService.getUser(userId, callback);
        userService.getAvatar(userId, (data) => {
            this.setState({
                avatar: data.data
            });
        });
        getUserBookType(userId, (data) => {this.setState({data: data});});
    }

    onEdit = () => {
        message.success("进入编辑状态");
        this.setState({
            flag: true,
        });
    }

    onSave = () => {
        let data = {};
        data.userId = this.state.userId;
        data.name = this.state.name;
        data.tel = this.state.tel;
        data.description = this.state.description;
        data.email = this.state.email;
        data.sex = this.state.sex;
        data.birthday = this.state.birthday;
        data.address = this.state.address;
        data.avatar = this.state.avatar;
        userService.updateUser(data);
        this.setState({
            flag: false,
        });
    }

    changeValue(e) {
        if (this.state.flag) {
            switch (e.target.name) {
                case "name":
                    this.setState({
                        name: e.target.value,
                    })
                    break;
                case "tel":
                    this.setState({
                        tel: e.target.value,
                    })
                    break;
                case "description":
                    this.setState({
                        description: e.target.value,
                    })
                    break;
                case "email":
                    this.setState({
                        email: e.target.value,
                    });
                    break;
                case "sex":
                    this.setState({
                        sex: e.target.value,
                    });
                    break;
                case "address":
                    this.setState({
                        address: e.target.value,
                    });
                    break;
                default:
                    break;
            }
        }
    }

    handleDateChange = (date) => {
        if (this.state.flag)
            this.setState({
                birthday: date
            });
    }

    handleUpload = (e) => {
        getBase64(e.target.files[0]).then(
            (result)=>{
                this.setState({
                    avatar: result,
                });
                userService.uploadAvatar(this.state.userId, result);
            }
        )
    }

    render() {
        return (
            <div class="profile">
                <h1 style={{ marginTop: "20px" }}>我的信息</h1>
                <Divider />
                <div className="avatar">
                    {this.state.avatar ? <img src={this.state.avatar} className="round_icon" /> : <img src={head} className="round_icon" />}
                    <Input type="file" style={{ width: "200px", height: "38px", marginLeft: "170px", marginTop: "20px" }} onChange={this.handleUpload}></Input>
                    <div className="chart">
                    <UserPieChart data={this.state.data}/>
                    </div>
                </div>
                <div class="form">
                    用户名：
                    <Form.Item>
                        <Input prefix={<Icon type="user" />} onChange={this.changeValue} value={this.state.name} className="input-format" name="name" />
                    </Form.Item>
                    简介：
                    <Form.Item>
                        <TextArea prefix={<Icon type="profile" />} onChange={this.changeValue} rows={4} value={this.state.description} className="input-format" name="description" />
                    </Form.Item>
                    电话：
                    <Form.Item>
                        <Input prefix={<Icon type="phone" />} onChange={this.changeValue} value={this.state.tel} className="input-format" name="tel" />
                    </Form.Item>
                        邮箱：
                    <Form.Item>
                        <Input prefix={<Icon type="mail" />} onChange={this.changeValue} value={this.state.email} className="input-format" name="email" />
                    </Form.Item>
                    <Form.Item>
                        性别:
                    <Radio.Group style={{ marginLeft: '10px' }} onChange={this.changeValue} value={this.state.sex} name="sex">
                            <Radio value={1}>Male</Radio>
                            <Radio value={2}>Female</Radio>
                            <Radio value={0}>Secret</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item>
                        <span>
                            生日:
                            <DatePicker onChange={this.handleDateChange} style={{ marginLeft: '20px' }} value={moment(this.state.birthday, dateFormat)} name="birthday" />
                        </span>
                    </Form.Item>
                        收货地址:
                    <Form.Item>
                        <Input prefix={<Icon type="environment" />} onChange={this.changeValue} value={this.state.address} className="input-format" name="address" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ background: "#46A3FF", border: "none" }} onClick={this.onSave}>
                            <Icon type="save" />Save
                        </Button>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: '20px', background: "#46A3FF", border: "none" }} onClick={this.onEdit}>
                            <Icon type="form" />Edit
                        </Button>
                    </Form.Item>
                </div>
            </div>
        )
    }
}