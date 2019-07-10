import React, { Component } from "react";
import { Layout, Menu, Icon, Button, Drawer, List, Card, Skeleton } from "antd";
import Graph from "./Graph";
import Users from "./users";
import Login from "./Login";
import Products from "./Products";
import Stores from "./stores";
import logo from "../images/logo.png";
import axios from "axios";
import MenuItem from "antd/lib/menu/MenuItem";

import Cookies from "universal-cookie";

const host = window.location.hostname;
const myDomain = host.substring(host.lastIndexOf("."));

const cookies = new Cookies();

class Admin extends Component {
  state = {
    collapsed: false,
    rendering: "",
    logged: ""
  };
  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  componentDidMount() {
    axios.get("https://api.pulsespace.com/user").then(res => {
      console.log("user received in response is", res.data);

      if (res.data.id) {
        console.log("Logged in User found inside admin.jsx is", res.data);

        this.setState({ logged: true });
        this.getNotifications();
      } else {
        // this.setState({ logged: false });
      }
    });
  }

  getNotifications() {
    axios.get("https://api.pulsespace.com/notifications/admin").then(res => {
      console.log("notifications from admin are", res.data);
      this.setState({ notifications: res.data });
    });
  }
  toggleDrawer = () => {
    this.setState({ visible: !this.state.visible });
  };
  handleLogin = () => {
    this.setState({ logged: true });
  };
  render() {
    const { Header, Content, Footer, Sider } = Layout;
    const SubMenu = Menu.SubMenu;

    return (
      <div>
        {this.state.logged ? (
          <Layout style={{ minHeight: "100%" }}>
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
                {/* <Menu.Item key="1">
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
               
              </SubMenu> */}
                <Menu.Item
                  key="2"
                  onClick={() => {
                    this.setState({ rendering: "users" });
                  }}
                >
                  <Icon type="desktop" />
                  <span>Users</span>
                </Menu.Item>
                <Menu.Item
                  key="3"
                  onClick={() => {
                    this.setState({ rendering: "stores" });
                  }}
                >
                  <Icon type="inbox" />
                  <span>Stores</span>
                </Menu.Item>

                <Menu.Item
                  key="4"
                  onClick={() => {
                    this.setState({ rendering: "products" });
                  }}
                >
                  <Icon type="inbox" />
                  <span>Products</span>
                </Menu.Item>

                <Menu.Item key="5" onClick={this.toggleDrawer}>
                  <Icon
                    type="bell"
                  />
                  <span>Notifications</span>
                </Menu.Item>

                {/* <Menu.Item key="4">
                <Icon type="inbox" />
                <span>Notifications</span>
              </Menu.Item> */}
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
                  {this.state.rendering === "graph" && <Graph />}
                  {this.state.rendering === "users" && <Users />}
                  {this.state.rendering === "stores" && <Stores />}
                  {this.state.rendering === "products" && <Products />}
                  <Drawer
                    title="Notifications"
                    placement="right"
                    closable={true}
                    onClose={this.toggleDrawer}
                    visible={this.state.visible}
                  >
                    {!this.state.notifications && <Skeleton />}
                    {this.state.notifications && (
                      <List
                        itemLayout="horizontal"
                        dataSource={this.state.notifications}
                        renderItem={item => (
                          <List.Item>
                            {item.is_read == 1 && (
                              <Card
                                hoverable
                                title={
                                  <div>
                                    <span>
                                      <Icon type="bell" />
                                    </span>{" "}
                                    {/* {item.title} */}
                                    {item.parent_type}
                                  </div>
                                }
                                // style={{
                                //     backgroundColor: "#E0D7D7"
                                // }}
                              >
                                <div style={{ fontWeight: "bold" }}>
                                  <span
                                    style={{
                                      fontFamily: "cursive",
                                      fontSize: "20px"
                                    }}
                                  >
                                    {item.description}
                                    <br/>
                                    {'Id of reported content is '+item.parent_id}

                                  </span>
                                </div>

                                {/* <a href={item.link}>
                                                    <List.Item.Meta
                                                        description={
                                                            item.description
                                                        }
                                                    />
                                                </a> */}
                              </Card>
                            )}
                            {item.is_read == 0 && (
                              <Card
                                hoverable
                                title={
                                  <div>
                                    <span>
                                      <Icon type="bell" />
                                    </span>{" "}
                                    {item.parent_type}
                                  </div>
                                }
                                // style={{backgroundColor:'green'}}
                              >
                                <div style={{ fontWeight: "bold" }}>
                                  <span
                                    style={{
                                      fontFamily: "cursive",
                                      fontSize: "20px"
                                    }}
                                  >
                                    {item.description}
                                    {'. Id of reported content is '+item.parent_id}
                                  </span>
                                </div>
                              </Card>
                            )}
                          </List.Item>
                        )}
                      />
                    )}
                  </Drawer>
                </div>
              </Content>
              <Footer style={{ textAlign: "center" }}>
              </Footer>
            </Layout>
          </Layout>
        ) : (
          <Login changeState={this.handleLogin} />
        )}
      </div>
    );
  }
}

export default Admin;
