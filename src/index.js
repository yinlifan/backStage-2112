import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom' 
import App from './App';
import 'antd/dist/antd.css';
import zhCN from 'antd/lib/locale/zh_CN';
import {ConfigProvider} from 'antd'

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
  <Router>
  <App />
  </Router>
  </ConfigProvider>,
  document.getElementById('root'));

