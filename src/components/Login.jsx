import React, { Component } from "react";
import FormLogin from "./LoginForm";
import { Row, Col } from "antd";

class Login extends Component {
    // constructor(props) {
    //     super(props);
    // }
    
    render() {
        return (
            <div>
                <Row style={{ textAlign: "center", marginTop: "10%" }}>
                    <Col span={12}>
                        <h1>Welcome to PulseSpace</h1>
                    </Col>
                    <Col span={8}>
                        <FormLogin 
                        changeState={this.props.changeState} 
                        />
                    </Col>
                </Row>
            </div>
           
        );
    }
}

export default Login;
