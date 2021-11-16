//  用来防翻墙的高阶组件
import React from 'react';
import req from '../http/req'
//  跳转问题可以使用组件的方式
import { Redirect } from 'react-router';

const Checklogin = (Cmp) => {
  return class NewCmp extends React.Component {
    state = { isFinish: false }
    render() {
      return this.state.isFinish ? this.state.isLogin ? <Cmp { ...this.props } /> : <Redirect to="/login" /> :<></>
    }
    componentDidMount() {
      // 在这里发送 JWT预检
      req.get('https://reactapi.iynn.cn/api/common/auth/jwtPreCheck')
      .then((res) => {
        if(res.data.errNo === 0){
          //  说明携带的token没有问题，是已经登录过的账号
          this.setState({
            isLogin : true,
            isFinish : true,
          })

        }else{
          // 说明没有登录，或者token值伪造
          this.setState({
            isLogin : false,
            isFinish : true
          })
        }
      })
    }
  }
}

export default Checklogin;
