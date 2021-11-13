//  密码登录模块
import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';
import Captcha from '../../components/Captcha'
import url from '../../config/url'
import req from '../../http/req';

class Passwdlogin extends Component {
  constructor(props){
    super(props)
    //  初始化状态
    this.state={}
    //  初始化ref
    this.RefCap = createRef()
  }
  
  render() {
    return (
      <div>
        <Form
      name="normal_login"
      className="login-form"
      initialValues={{
      }}
      onFinish={this.onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item
      name="captcha"
      rules={[
        {
          required: true,
          message: '请输入验证码',
        },
      ]}
      >
        <div>
        <Input
            prefix={<KeyOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="验证码"
            style={{width: "65%",marginRight:"15px"}}
          />
          <Captcha setH={32} setW={96} setKey={ this.getKey} ref={ this.RefCap } />
          </div>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" block>
          登 录
        </Button>
      </Form.Item>
    </Form>
      </div>
    );
  }
  //  表单验证提交
  onFinish = (values) => {
    values.key = this.state.key
    // console.log('Received values of form: ', values);
    //  在这里发送请求
    req.post(url.PWdLg, values)
    .then((res) => {
      console.log(res);
      //  判断请求成功还是失败，并做出相应的提示
      if(res.data.errNo === 0){
        // 成功的时候
        message.success('登录成功!', 2, () => {
          //  跳转首页
          this.props.history.push('/home')
        })
      }else{
        //  失败的时候
        message.error('用户名或密码或验证码错误！', 2, () => {
          //  刷新验证码，（使用ref获取节点的方式调用）
          this.RefCap.current.changeCaptcha()
        })
      }
    })
  };
  //  获取验证码key值
  getKey = (key) => {
    this.setState({
        key,
    });
};
}

export default withRouter(Passwdlogin);
