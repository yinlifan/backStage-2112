import React, { Component } from 'react';
import { Tabs,Card } from 'antd';
import styled from 'styled-components';
import bg from '../../assets/img/bg.jpg'
import Passwdlogin from './PasswdLogin'
import Mobilelogin from './MobileLogin'



class Index extends Component {
  render() {
    const { TabPane } = Tabs;
    return (
      <Container>
        <FormBox>
        <Card style={{ width: 400,height:330,borderRadius:19 }}>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="密码登录" key="1">
              <Passwdlogin />
            </TabPane>
            <TabPane tab="短信登录" key="2">
              <Mobilelogin />
            </TabPane>
          </Tabs>
        </Card>
        </FormBox>
      </Container>
    );
  }
}
//  大容器的样式
const Container = styled.div`
      height: 100%;
      width: 100%;
      background: url(${bg});
      background-size: 100%;
`
//  表单盒子得样式
const FormBox = styled.div`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);

`

export default Index;
