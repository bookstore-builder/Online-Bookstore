import React from "react";
import { withRouter } from "react-router-dom";
import { Navigator } from "../components/home/Navigator";
import { Button, Typography } from 'antd';
import { Layout, Menu, Breadcrumb, Input } from 'antd';
const { Search } = Input;
const { TextArea } = Input;

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

class ChatView extends React.Component {
    state = {
        userList: "Users:\n",
        chatHistory: "",
        user: "",
    };
    wsocket = new WebSocket("ws://localhost:8080/websocket");

    onMessage = (msg) => {
        console.log(msg.data);
        let chatHistory = this.state.chatHistory;
        let userlist = this.state.userList;
        let data = JSON.parse(msg.data);
        if (data.type === "chat") {
            chatHistory = this.state.chatHistory + data.user + ": " + data.message + "\n";
        } else if (data.type === "users") {
            userlist = "Users:\n"
            console.log(data.userlist.length);
            for (var i = 0; i < data.userlist.length; ++i) {
                userlist += data.userlist[i] + "\n";
            }
        } else if (data.type === "info") {
            chatHistory = chatHistory + data.info + "\n";
        }
        this.setState({chatHistory: chatHistory, userList: userlist});
    }

    componentDidMount() {
        this.wsocket.onmessage = this.onMessage;
    }

    handleJoin = (name) => {
        var joinMsg = {};
        joinMsg.type = "join";
        joinMsg.user = name;
        console.log(joinMsg);
        this.wsocket.send(JSON.stringify(joinMsg));
        this.setState({user: name});
    }

    handleMessage = (event) => {
        console.log(event.target.value);
        var Msg = {
            type: "chat",
            user: this.state.user,
            receiver: "all",
            message: event.target.value
        };
        console.log(Msg);
        this.wsocket.send(JSON.stringify(Msg));
        event.target.value = "";
    }

    render() {
        return (
            <div className="Container">
                <Navigator />
                <Content style={{ padding: '80px 200px', color: "write" }}>
                    <Title>WebSocket ChatRoom</Title>
                    <Search
                        style={{ width: '50%', paddingBottom: '20px' }}
                        placeholder="your name"
                        onSearch={this.handleJoin}
                        enterButton="Join"
                    />
                    <div style={{overflow:'hidden' ,paddingBottom: '20px'}}>
                        <div style={{width: '80%', float:'left', paddingRight: '10px'}}>
                        <TextArea rows={17} value={this.state.chatHistory} style={{marginBottom: '11px'}} readOnly={true}/>
                        <TextArea rows={4} onPressEnter={(event)=>this.handleMessage(event)}/>
                        </div>
                        <div style={{width: '20%', float:'left'}}>
                        <TextArea rows={22} value={this.state.userList} readOnly={true}/>
                        </div>
                    </div >
                </Content>
            </div>
        )
    }
}
export default withRouter(ChatView);