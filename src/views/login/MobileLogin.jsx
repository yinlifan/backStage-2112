//  短信密码登录
//  短信验证步骤 1.点击获取短信前先看验证码是否正确（接口一） 2.点击获取短信验证码（接口二） 3.点击提交表单（接口三）

import React, { Component, createRef } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined, KeyOutlined } from '@ant-design/icons';
import Captcha from '../../components/Captcha'
import url from '../../config/url'
import req from '../../http/req';

class Mobilelogin extends Component {
  constructor(props){
    super(props)
    //  初始化状态
    this.state={
      // 用于倒计时
      time: 30,
      // 用于标记是否已经获取了短信
      sentcode: false,    // ?
      // 指定按钮是否可以被点击
      enabled: false,


    }
    //  初始化ref
    this.RefCap = createRef()
    this.RefForm = createRef()
  }
  //  通过成员属性的方式来存储定时器
    timerId = null
  
  render() {
    return (
      <div>
        <Form
      name="normal_login"
      className="login-form"
      ref={this.RefForm}
      initialValues={{
      }}
      onFinish={this.onFinish}
    >
      <Form.Item
        name="mobile"
        rules={[
          {
            required: true,
            message: '请输入手机号',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="手机号" maxLength="11" />
      </Form.Item>
      
      <Form.Item
      name="captcha"
      rules={[
        {
          required: true,
          message: '请输入图形验证码',
        },
      ]}
      >
        <div>
        <Input
            prefix={<KeyOutlined className="site-form-item-icon" />}
            type="text"
            placeholder="图形验证码"
            style={{width: "65%",marginRight:"15px"}}
          />
          <Captcha setH={32} setW={96} setKey={ this.getKey} ref={ this.RefCap } />
          </div>
      </Form.Item>
      <Form.Item
        name="code"
        rules={[
          {
            required: true,
            message: '请输入短信验证码',
          },
        ]}
      >
        <div>
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="text"
          placeholder="短信验证码"
          maxLength="6"
          style={{width: "60%",marginRight:"5px"}}
        />
        <Button type="primary" style={{width: "37%"}} disabled={this.state.enabled} onClick={this.sendcode}>
          { this.state.enabled? `重新获取(${this.state.time})`: '获取短信验证码' }
        </Button>
        </div>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" block >
          登 录
        </Button>
      </Form.Item>
    </Form>
      </div>
    );
  }
  //  获取验证码key值
  getKey = (key) => {
    this.setState({
        key,
    });
};
  //  重新获取按钮的倒计时功能封装
  timedown = () => {
    if(this.state.time === 0){
      //  倒计时已经结束
      this.setState({
        time: 30,
        enabled: false, // 能被点击

      })
    }else{
      // 倒计时没结束
      this.setState({
        time: this.state.time -1,
        enabled: true,  // 不能被点击
      })
      //  核心
      this.timerId = setTimeout(() => {
        this.timedown()
      },1000)
    }
  }
  //  点击按钮获取短信验证码
  sendcode = () => {
    let { mobile, captcha} = this.RefForm.current.getFieldsValue()
    // console.log(mobile,captcha);
    // 正则验证
    if(/^1[3-9]\d{9}$/.test(mobile) && captcha){
      //  验证通过,可以发送请求
      req.post(url.MobileVerifyCap,{captcha, key:this.state.key})
      .then((res) => {
        //  验证通过会返回一个token值，请求短信下发需要携带token值
        if(res.data.errNo === 0) {
          let token = res.data.context.token
          req.post(url.MobileSendCode, {mobile, token, type: 0})
          .then((res) => {
            if(res.data.errNo === 0){
              //  后台短信发送成功
              this.setState({
                requestId: res.data.requestId,
                sentcode: true  // 标记短信已发送
              })
              message.success('短信发送成功，请注意查收！', 2)
              //  可以开始倒计时
              this.timedown()
            }else{
              // 后台短信发送失败
              message.error(res.data.errText, 2, () => {
                this.RefCap.current.changeCaptcha()
              })
            }
          })
        }else{
          //  图形验证码没有通过验证，短信无法下发
          message.error(res.data.errText, 2, () => {
            this.RefCap.current.changeCaptcha()
          })
        }
      })
    }else{
      // 表单验证么没通过
      message.error('手机号或图形验证码不正确', 2)
      this.RefCap.current.changeCaptcha()
    }

  }
  //  点击登录,表单提交
  onFinish = (values) => {
    console.log(1111);
    let { mobile, code } = values
    let params = { mobile, code, requestId: this.state.requestId }
    req.post(url.MobileLg, params)
    .then((res) => {
        if(res.data.errNo === 0){
          //  登录成功，准备跳转
          message.success('登录成功，准备跳转！', 1.5, () => {
            this.props.history.push('/home')
          })
        }else{
          // 登录失败
          message.error(res.data.errText, 2, () => {
            //  刷新验证码，（使用ref获取节点的方式调用）
            this.RefCap.current.changeCaptcha()
          })
        }
      }
    )
  }
  //  定时器记得销毁
  componentWillUnmount(){
    clearTimeout(this.timerId)
  }
}

export default withRouter(Mobilelogin);
