import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Bundle from './bundle'


//使用bundle-loader来实现按需加载
import Home from "bundle-loader?lazy&name=home!pages/Home/home"
import Page1 from 'bundle-loader?lazy&name=page1!pages/Page1/page1'
import Counter from "bundle-loader?lazy&name=counter!pages/Counter/counter"
import UserInfo from 'bundle-loader?lazy&name=userInfo!pages/UserInfo/userInfo'

const Loading = () => {
  return <div>Loading...</div>
}

const createComponent = (component) => () => (
  <Bundle load={component}>
    {
      (Component) => Component ? <Component/> : <Loading/>  
    }
  </Bundle>
)

const getRouter = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">首页</Link></li>
        <li><Link to="/page1">Page1</Link></li>
        <li><Link to ="/counter">Counter</Link></li>
        <li><Link to ="/userinfo">UserInfo</Link></li>
      </ul>
      <Switch>
        <Route exact path="/" component={createComponent(Home)}></Route>
        <Route path="/page1" component={createComponent(Page1)}></Route>
        <Route path="/counter" component={createComponent(Counter)}/>
        <Route path="/userinfo" component={createComponent(UserInfo)}/>
      </Switch>
    </div>
  </Router>
)

export default getRouter;