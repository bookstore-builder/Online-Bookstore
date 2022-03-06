import React from "react";
import { withRouter } from "react-router-dom";
import { Navigator } from "../components/home/Navigator";
import { Button, Typography } from 'antd';
import { Layout, Menu, Breadcrumb, Input } from 'antd';
import { getAvatar } from "../services/userService";
import head from "../assets/head.png";
import '../css/chat.css';
const { Search } = Input;
const { TextArea } = Input;
const { Header, Content, Footer } = Layout;
const { Title } = Typography;

const Message = ({chat, user}) => (
    <li className={user === chat.username ? "chatright" : "chatleft"}>
        {user !== chat.username
            && <img src={chat.img} alt={`${chat.username}'s profile pic`} /> 
        }
        {user !== chat.username && <p style={{ fontSize: "12px", marginTop: "-10px" }}>{chat.username}: </p>}
        <p>{chat.content}</p>
    </li>
);

class ChatView extends React.Component {
    state = {
        userList: "用户：\n",
        chatHistory: [],
        user: ""
    };
    wbsocket = new WebSocket("ws://localhost:8080/websocket");

    onMessage = (msg) => {
        let chatHistory = this.state.chatHistory;
        let userlist = this.state.userList;
        let data = JSON.parse(msg.data);
        if (data.type === "chat") {
            chatHistory = chatHistory.concat([{
                username: data.user,
                content: <p>{data.message}</p>,
                img: data.img ? data.img : head,
            }]);
        } else if (data.type === "users") {
            userlist = "Users:\n";
            for (var i = 0; i < data.userlist.length; ++i) {
                userlist += data.userlist[i] + "\n";
            }
        }
        this.setState({chatHistory: chatHistory, userList: userlist});
    }

    componentDidMount() {
        let user = localStorage.getItem("user");
        let username = JSON.parse(user).username;
        let usertype = JSON.parse(user).userType;
        let userId = JSON.parse(user).userId;
        getAvatar(userId, (data) => {
            this.setState({ 
                avatar: data.data, 
            });
        });
        this.setState({
            user: username,
            usertype: usertype,
        });
        this.wbsocket.onmessage = this.onMessage;
        this.setState({disabled: false});
    }

    handleJoin = (name) => {
        var joinMsg = {};
        joinMsg.type = "join";
        joinMsg.user = name;
        this.wbsocket.send(JSON.stringify(joinMsg));
        this.setState({user: name, disabled: true});
    }

    handleMessage = (event) => {
        if (event.keyCode === 13) {
            var Msg = {
                type: "chat",
                user: this.state.user,
                receiver: "all",
                message: event.target.value.replace("\n",""),
                img: this.state.avatar,
            };
            this.wbsocket.send(JSON.stringify(Msg));
            event.target.value = "";
        }
    }

    render() {
        const { user, chatHistory } = this.state;

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
                        disabled={this.state.disabled}
                    />
                    <div style={{overflow:'hidden' ,paddingBottom: '20px'}}>
                        <div style={{width: '80%', float:'left', paddingRight: '10px'}}>
                        <ul className="chats">
                        {
                            chatHistory.map((chat) => 
                                <Message chat={chat} user={user} />
                            )
                        }
                        </ul>
                        <TextArea rows={4} onKeyDown={(event)=>this.handleMessage(event)}/>
                        </div>
                        <div style={{width: '20%', float:'left'}}>
                        <TextArea rows={26} value={this.state.userList} readOnly={true}/>
                        </div>
                    </div >
                </Content>
            </div>
        )
    }
}
export default withRouter(ChatView);