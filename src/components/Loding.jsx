//  加载中组件封装
import React, { Component } from 'react';
import { Spin} from 'antd';
import styled from 'styled-components';

class Loding extends Component {
  render() {
    return (
      <Continar>
        <Spin size="large" tip="加载中..." />
      </Continar>
        
    );
  }
}

//  样式
const Continar = styled.div`
    padding-top: 20%;
    text-align: center;
    background: rgb(255,255,255);
    border-radius: 4px;
`

export default Loding;
