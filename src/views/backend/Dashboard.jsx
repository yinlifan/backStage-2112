//  布局文件，（决定了项目的页面结构，公共的一些内容
//  嵌套路由的父组件
import React, { Component, Fragment } from 'react';
import { Layout, Menu, Button, Modal } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import Admin from '../../router/Admin';
import req from '../../http/req'
import url from '../../config/url'
//  引入样式
import '../../assets/css/layout.css'
import logo from "../../assets/img/logo1.jpg"
//  导入路由模块
import {Link} from 'react-router-dom'
//  导入hoc强化函数
import Checklogin from '../../hoc/CheckLogin';



class Dashboard extends Component {
  state = {
    collapsed: false,
    selectKey: [this.props.location.pathname],
    openKey: [this.props.location.pathname.split('/').splice(0,3).join('/')]
  };
  acl = JSON.parse(sessionStorage.getItem('acl'))
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { Header, Sider, Content } = Layout;
    const { username, ip, addr } = this.state
    return (
      <Layout style={{height:"100%"}}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" style={{textAlign:"center"}} >
            <img src={logo} alt="" style={{width:"80px", backgroundColor:"grey"}}/>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={this.state.selectKey} defaultOpenKeys={this.state.openKey}>
            {/* 动态渲染菜单 */}
            {
              this.acl.map((el) => {
                return el.children.length ? <Menu.SubMenu key={el.auth_path} title={el.auth_name}>
                  {
                    el.children.map((ele) => {
                      return ele.is_nav ? <Menu.Item key={ele.auth_path}><Link to={el.auth_path}>{ele.auth_name}</Link></Menu.Item>: <Fragment key={ele.auth_path}></Fragment>
                    })
                  }
              </Menu.SubMenu> : <Menu.Item key="1" ><Link to={el.auth_path}>{el.auth_name}</Link></Menu.Item>
              })
            }
            
          
            
          
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: "0px 0px 0px 15px" }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
            <span style={{paddingLeft:"15px"}}>您好，{username}！上次登录于 {addr} ({ip}) </span><Button onClick={ this.exitLg }>注销登录</Button> 
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            <Admin />
          </Content>
        </Layout>
      </Layout>
    );
  }
  componentDidMount(){
    //  获取当前人员信息
    req.get(url.AdiminInfo)
    .then((res) => {
      if(res.data.errNo === 0){
        this.setState({
          username: res.data.accountInfo.username,
          ip: res.data.accountInfo.last_ip,
          addr: res.data.accountInfo.last_login_addr.state + ' ' + res.data.accountInfo.last_login_addr.isp
        })
      }
    })
  }
  //  点击退出登录
  exitLg = () => {
      Modal.confirm({
        title: '确认操作',
        icon: <ExclamationCircleOutlined />,
        content: '您确认注销本次登录？',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          //  执行注销操作
          sessionStorage.removeItem('jwt')
          sessionStorage.removeItem('acl')
          this.props.history.push('/')
        }
      });
    }
}

export default Checklogin(Dashboard);
