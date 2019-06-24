import React, { Component } from "react";
import { Form, Icon, Input, Button, Card } from "antd";
import axios from "axios";


import Cookies from "universal-cookie";

const host = window.location.hostname;
const myDomain = host.substring(host.lastIndexOf("."));

const cookies = new Cookies();

class LoginForm extends React.Component {
    state = {
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                console.log('Error occurred', err);
            }else{
                console.log("Received values of form: ", values);

                axios
                    .post("https://api.pulsespace.com/login", values)
                    .then(res => {
                        console.log("response from login api is", res);
                        cookies.set("access_token", res.data.token);
                        this.props.changeState();
                        window.location.reload();
                    });
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Card
                title={
                    "Welcome to Shopx Business owners portal, please login to continue"
                }
            >
                <Form
                    onSubmit={this.handleSubmit}
                    style={{ backgroundColor: "white" }}
                >
                    <Form.Item>
                        {getFieldDecorator("email", {
                            rules: [
                                {
                                    type: "email",
                                    required: true,
                                    message: "Please input your email!"
                                }
                            ]
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type="user"
                                        style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                }
                                placeholder="email"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator("password", {
                            rules: [
                                {
                                    required: true,
                                    message: "Please input your Password!"
                                }
                            ]
                        })(
                            <Input
                                prefix={
                                    <Icon
                                        type="lock"
                                        style={{ color: "rgba(0,0,0,.25)" }}
                                    />
                                }
                                type="password"
                                placeholder="Password"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        <br />
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

const FormLogin = Form.create({ name: "normal_login" })(LoginForm);
export default FormLogin;
