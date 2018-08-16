import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['pages/logs/main',
      'pages/index/main',
      'pages/yx_index/main',
      'pages/login/main',
      'pages/car/main',
      'pages/me/main',
      'pages/address/list/main',
      'pages/address/add/main',
      'pages/address/edit/main',
      'pages/confirmProduct/main',
      'pages/order/list/main',
      '^pages/product/main'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      'color': '#333',
      'selectedColor': '#09BB07',
      'list': [{
        'pagePath': 'pages/yx_index/main',
        'iconPath': '/static/img/tabbar/icon_tabbar.png',
        'selectedIconPath': '/static/img/tabbar/icon_tabbar.png',
        'text': '首页'
      }, {
        'pagePath': 'pages/car/main',
        'iconPath': '/static/img/tabbar/icon_tabbar.png',
        'selectedIconPath': '/static/img/tabbar/icon_tabbar.png',
        'text': '购物车'
      }, {
        'pagePath': 'pages/me/main',
        'iconPath': '/static/img/tabbar/icon_tabbar.png',
        'selectedIconPath': '/static/img/tabbar/icon_tabbar.png',
        'text': '我的'
      }]
    }
  }
}
