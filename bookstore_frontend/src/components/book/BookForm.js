import { Drawer, Form, Button, Col, Row, Input, Select } from 'antd';
import React from 'react';
import "../../css/sidebar.css"
import * as bookService from "../../services/bookService"

const { Option } = Select;

let info = {
    name: "",
    author: "",
    type: "",
    price: 0,
    inventory: 1000,
    description: "",
    image: "",
    isbn: "",
};

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

export class BookForm extends React.Component {
    state = {
        visible: false,
        info: [],
    };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onUpload = (e) => {
        getBase64(e.target.files[0]).then(
            (result)=>{
                info.image = result;
                this.setState({
                    info: info
                });
            }
        )
    }

    onNameInput = (e) => {
        info.name = e.target.value;
        this.setState({
            info: info,
        });
    }

    onClassChange = (value) => {
        info.type = value;
        this.setState({
            info: info,
        });
    }

    onPriceChange = (e) => {
        info.price = parseFloat(e.target.value);
        this.setState({
            info: info,
        });
    }

    onInventoryChange = (e) => {
        info.inventory = parseInt(e.target.value);
        this.setState({
            info: info,
        });
    }

    onAuthorInput = (e) => {
        info.author = e.target.value;
        this.setState({
            info: info,
        });
    }

    onISBNInput = (e) => {
        info.isbn = e.target.value;
        this.setState({
            info: info,
        });
    }

    onDescriptionChange = (e) => {
        info.description = e.target.value;
        this.setState({
            info: info,
        });
    }

    onSubmit = () => {
        this.setState({
            visible: false,
        });
        bookService.addBook(info);
    }

    render() {
        return (
            <>
                <a style={{ marginLeft: "5px", fontSize: "13px", fontWeight: "normal" }} onClick={this.showDrawer}>+add</a>
                <Drawer
                    title="添加新书"
                    width={500}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    bodyStyle={{ paddingBottom: 80 }}
                >
                    <Form layout="vertical" hideRequiredMark>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="书名"
                                    rules={[{ required: true, message: 'Please enter book name' }]}
                                >
                                    <Input placeholder="Please enter book name" onChange={this.onNameInput} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="url"
                                    label="图片"
                                    rules={[{ required: false, message: 'Please upload image' }]}
                                >
                                    <Input type="file" onChange={this.onUpload}>
                                    </Input>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="author"
                                    label="作者"
                                    rules={[{ required: true, message: 'Please input author name' }]}
                                >
                                    <Input placeholder="Please enter author name" onChange={this.onAuthorInput} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="class"
                                    label="分类"
                                    rules={[{ required: true, message: 'Please choose the class' }]}
                                >
                                    <Select placeholder="Please choose the class" onChange={this.onClassChange}>
                                        <Option value="编程">编程</Option>
                                        <Option value="小说">小说</Option>
                                        <Option value="科幻">科幻</Option>
                                        <Option value="名著">名著</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                        <Col span={12}>
                                <Form.Item
                                    name="isbn"
                                    label="编号"
                                    rules={[{ required: true, message: 'Please enter ISBN' }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        placeholder="Please enter ISBN"
                                        onChange={this.onISBNInput}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="price"
                                    label="价格"
                                    rules={[{ required: true, message: 'Please input price' }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        addonBefore="¥"
                                        placeholder="Please enter price"
                                        onChange={this.onPriceChange}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="count"
                                    label="库存"
                                    rules={[{ required: true, message: 'Please enter the capacity' }]}
                                >
                                    <Input
                                        style={{ width: '100%' }}
                                        addonAfter="件"
                                        placeholder="Please enter capacity"
                                        onChange={this.onInventoryChange}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24}>
                                <Form.Item
                                    name="description"
                                    label="简介"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'please enter book description',
                                        },
                                    ]}
                                >
                                    <Input.TextArea rows={4} placeholder="please enter book description" onChange={this.onDescriptionChange} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                            Cancel
                            </Button>
                        <Button onClick={this.onSubmit} type="primary" style={{ background: "#46A3FF", border: "none" }}>
                            Submit
                            </Button>
                    </div>
                </Drawer>
            </>
        )
    }
}
