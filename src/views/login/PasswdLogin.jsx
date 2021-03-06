import React, { Component } from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';
import Captcha from '../../components/Captcha'
import url from '../../config/url'
import req from '../../http/req';

class Passwdlogin extends Component {
  //  初始化状态
  state={}
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
          <Captcha setH={32} setW={96 } setKey={ this.getKey.bind(this) } />
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
    })
  };
  //  获取验证码key值
  getKey(val){
    this.setState((state) => {
      state.key = val
      return state
    })
    console.log(this.state);
  }
}

export default Passwdlogin;
