import React, { Component } from "react";
import { Layout, Menu, Icon, Button } from "antd";
import Graph from './Graph';
import Users from './users';
import logo from "../images/logo.png";



import MenuItem from "antd/lib/menu/MenuItem";

class Admin extends Component {
  state = {
    collapsed: false,
    rendering:''
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { Header, Content, Footer, Sider } = Layout;
    const SubMenu = Menu.SubMenu;

    return (
      <div>
        <Layout style={{ minHeight: '100%'}}>
          <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={broken => {
              console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
              console.log(collapsed, type);
            }}
          >
            <div>
              <img
                src={logo}
                alt="logo"
                style={{ height: "50px", margin: "16px" }}
              />
            </div>
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              theme="dark"
              inlineCollapsed={this.state.collapsed}
            >
              <Menu.Item key="1">
                <Icon type="pie-chart" />
                <span onClick={()=>{this.setState({rendering:'graph'})}}> Activities</span>
              </Menu.Item>

              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="pie-chart" />
                    <span>Store Activities</span>
                  </span>
                }
              >
                <Menu.Item key="2">New Products</Menu.Item>
                <Menu.Item key="3">New Stores</Menu.Item>
                <Menu.Item key="4">New Reviews</Menu.Item>
              </SubMenu>
              <Menu.Item key="5">
                <Icon type="desktop" />
                <span onClick={()=>{this.setState({rendering:'users'})}}>Users</span>
              </Menu.Item>
              <Menu.Item key="6" onClick={this.handlestores}>
                <Icon type="inbox" />
                <span>Stores</span>
              </Menu.Item>

              <Menu.Item key="7">
                <Icon type="inbox" />
                <span>Notifications</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <h1 style={{ fontFamily: "sans sarif" }}>DashBoard</h1>
            </Header>

            <Content style={{ margin: "24px 16px 0" }}>
              <div
                style={{ padding: 24, background: "#fff", minHeight: 360 }}
              >
                Main content to be shown here
                {this.state.rendering === 'graph' && <Graph/>}
                {this.state.rendering == 'users' && <Users/>}

              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
              <br/>
              <div>Something</div>
              <br/>
              <div>Something</div>
              Ant Design ©2018 Created by Ant UED
              <br/>
              <div>Something</div>
              <br/>
              <div>Something</div>
              <br/>
              <div>Something</div>
              <br/>
              <div>Something</div>
            </Footer>
          </Layout>
        </Layout>
        ,
      </div>
    );
  }
}

export default Admin;
