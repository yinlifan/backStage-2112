//  封装验证码
//  1.验证码是图片 2.有看不清的情况，点击可以重新获取 3.从后端验证码获取的两种情况 4.key值与验证码一一对应
//  二 。 既然是封装，也要考虑验证码大小的问题
//  三 。 key值存储位置？ 谁调用谁存储，如果存在当前组件中，key值会被覆盖（子传父）
//  四 。 使用方法
//       接收三个props参数 setW setH  setKey（必须）
//  五 。 Bug - 当后期有token值的时候，会出现还没有请求完就跳走的现象，需要在组件销毁时取消这次请求

import React, { Component } from 'react';
import axios from 'axios';

class Captcha extends Component {
  //  初始化状态
  state={}
  //  cancel Token
  // CancelToken = axios.CancelToken
  source = axios.CancelToken.source()
  render() {
    //  灵活的获取验证码大小
    let w = this.props.setW || 120
    let h = this.props.setH || 40
    return (
      <>
        <img src={this.state.img} width={ w } height={ h } alt="点击刷新验证码" onClick={ this.changeCaptcha.bind(this) }/>
      </>
    );
  }
  //  组件挂载完毕，请求验证码
  componentDidMount(){
    this.changeCaptcha()
  }
  //  请求验证码
  changeCaptcha(){
    //  这里的axios使用的是原生的，封装的组件需要做到没有依赖，可以即插即用
    axios.get('https://reactapi.iynn.cn/captcha/api/math',{
      //  如果是get请求，参数位于第二个实参，如果是post请求则是第三个实参(给一个用于取消的token值)
      cancelToken: this.source.token
    })
    .then((res) => {
      this.setState({
        key: res.data.key,
        img: res.data.img
      })
      this.props.setKey(res.data.key)
    })
    //  在最后需要加上catch，让错误不显示
    .catch(function(thrown){})
  }
  //  当组件卸载时
  componentWillUnmount(){
    //  取消发送请求
    this.source.cancel()
  }
}

export default Captcha;
