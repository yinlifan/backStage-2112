//  路由搭建  一切皆组件  建议使用函数组件（1.不会使用到生命周期 2.redux取值简单 3.涉及到类似于路由守卫的使用）
//  在react中使用路由懒加载（提高性能）Suspense组件 和lazy方法
import React,{Suspense,lazy} from 'react';
import Loding from '../components/Loding'
import { Switch,Route,Redirect } from 'react-router-dom';

const Index = () => {
  const Login = lazy(() => import('../views/login'))
  return (
    <Suspense fallback={<Loding />}>
      <Switch>
          <Route path="/login" component={Login} />
          <Redirect exact from="/" to="/login" />
      </Switch>
    </Suspense>
  );
}

export default Index;

