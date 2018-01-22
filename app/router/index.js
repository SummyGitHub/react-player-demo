import React from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';

import Bundle from './bundle'

import Home from "pages/Home/home"
import Page1 from 'pages/Page1/page1'
import Counter from "pages/Counter/counter"
import UserInfo from 'pages/UserInfo/userInfo'

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
        <Route exact path="/" component={Home}></Route>
        <Route path="/page1" component={Page1}></Route>
        <Route path="/counter" component={Counter}/>
        <Route path="/userinfo" component={UserInfo}/>
      </Switch>
    </div>
  </Router>
)

export default getRouter;