var Fly = require("flyio/dist/npm/wx") 
const fly = new Fly;
// 配置请求基地址
fly.config.baseURL = 'https://www.qimingzizeinan.com/'
if (process.env.NODE_ENV === 'development') {
  fly.config.baseURL = 'http://localhost:8090/'
}

// 添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response, promise) => {
    console.log('response', response)
    // 只将请求结果的data字段返回
    return response.data
  },
  (err, promise) => {
    // 发生网络错误后会走到这里
    // promise.resolve("ssss")
  }
)
//添加请求拦截器
fly.interceptors.request.use((request)=>{
  // console.log('这里是header拦截器', request)
  //给所有请求添加自定义header
  request['headers'] = wx.getStorageSync('header');
    //打印出请求体
    // console.log(request.headers)
    //终止请求
    //var err=new Error("xxx")
    //err.request=request
    //return Promise.reject(new Error(""))

  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request;
})

export default fly
