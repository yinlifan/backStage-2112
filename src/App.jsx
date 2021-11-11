import React, { Component } from 'react';
//  导入路由规则
import RouterRules from './router/Index'
import styled from 'styled-components';


class App extends Component {
  render() {
    return (
      <Allbox>
        <RouterRules />
      </Allbox>
    );
  }
  
}
//  样式
const Allbox = styled.div`
      height: 100%;
      width: 100%;
`


export default App;
