'use strict'
import React from 'react'
import {render} from 'react-dom'
import Hello from 'components/hello'
import getRouter from 'router/index'
import {AppContainer} from 'react-hot-loader'
import {Provider} from 'react-redux' //让所有组件都可以访问到store
import store from './redux/store'



const renderWithHotReload = (RootElement) => {
  render(
    <AppContainer>
      <Provider store={store}>
        {RootElement}
      </Provider>
    </AppContainer>,
  document.getElementById('main')) 
}

//初始化
renderWithHotReload(getRouter());

//模块热替换(热更新)
if(module.hot){
  module.hot.accept();
}


 

