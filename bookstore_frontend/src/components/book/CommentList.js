import React from 'react';
import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';
import * as commentService from "../../services/commentService";
import head from "../../assets/head.png";

const { TextArea } = Input;

const CommentLst = ({ comments }) => (
    <List
        dataSource = {comments}
        header = {`${comments.length} ${comments.length > 1 ? 'comments' : 'comment'}`}
        itemLayout="horizontal"
        pagination= {{
            pageSize: 3,
        }}
        renderItem={props => <Comment {...props}
        />}
    />
);

const Editor = ({ onChange, onSubmit, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType='submit' onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

export class CommentList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bookId: this.props.bookId,
            userId: this.props.userId,
            userName: this.props.userName,
            comments: [],
            submitting: false,
            value: '',
        };
    }

    componentDidMount(){
        commentService.getBookComments(this.state.bookId, (data)=>{
            let results = [];
            for (var i=0, len=data.length; i<len; i++) {
                let result = {
                    author: data[i].author,
                    avatar: head,
                    content: <p>{data[i].comment}</p>,
                    datetime: data[i].time,
                }
                results.push(result);
            }
            this.setState({
                comments: results,
            });
        });
    }

    handleSubmit = () => {
        if (!this.state.value) {
            return;
        }

        setTimeout(() => {
            commentService.addCommentItem(this.state.bookId, this.state.userId, 
                this.state.value, moment().subtract(1, 'days').format('YYYY/MM/DD HH:mm'));
            this.setState({
                submitting: false,
                value: '',
                comments: [
                    ...this.state.comments,
                    {
                        author: this.state.userName,
                        avatar: head,
                        content: <p>{this.state.value}</p>,
                        datetime: moment().subtract(1, 'days').format('YYYY/MM/DD HH:mm'),
                    },
                ],
            });
        }, 100);
    };

    handleChange = e => {
        this.setState({
            value: e.target.value,
        });
    };

    render() {
        const { comments, submitting, value } = this.state;

        return (
        <div>
            {comments.length > 0 && <CommentLst comments={comments}/>}
            <Comment
                avatar={<Avatar src={head} alt={this.state.userName}/>}
                content={
                    <Editor
                        onChange={this.handleChange}
                        onSubmit={this.handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />
        </div>
        );
    }
}