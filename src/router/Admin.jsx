//  登录后的路由规则

import React from 'react';
import { Route } from 'react-router-dom';
import UserIndex from '../views/backend/user/Index'

const Admin = () => {
  return (
    <>
      <Route path="/dashboard/user/index" component={UserIndex} />
    </>
  );
}

export default Admin;
