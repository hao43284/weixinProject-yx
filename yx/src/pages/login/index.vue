<template>
  <div>
    这里是登录
  </div>
</template>

<script>
import wxp from 'minapp-api-promise'
export default {
  methods: {
    navigateIndex () {
      wx.switchTab({
        url: '../yx_index/main'
      })
    },
    async getUserInfo () {
      let _login = await wxp.login().catch((err) => {
        console.log('微信登录err', err)
      })
      console.log('_login', _login)
      let _userInfo = await wxp.getUserInfo().catch((err) => {
        console.log('微信获取用户信息err', err)
      })
      console.log('这里是走的')
      let res = null
      try {
        res = await wxp.request({
          // url: utils.getRequestUrl() + "/get_jwt",
          // url: 'https://www.qimingzizeinan.com/wx/user/loginbycode',
          url: 'http://localhost:8090/wx/user/loginbycode',
          data: {
            code: _login.code,
            encryptedData: _userInfo.encryptedData,
            iv: _userInfo.iv
          },
          header: {
            'content-type': 'application/json'
          }
        })
      } catch (e) {
        console.log('e', e)
      }
      let data = res.data
      console.log('登录获取openid', res)
      if (data.code) {
        let header = {
          'Authorization': data.token
        }
        wx.setStorageSync('header', header)
        wx.setStorageSync('openid', data.result.wxOpenid)
        this.navigateIndex()
      } else {
        wx.showToast({
          title: data.errMsg,
          icon: 'success',
          duration: 2000
        })
      }
      if (res.statusCode === 401) {
        this.getUserInfo()
      }
    }
  },
  onLoad () {
    this.getUserInfo()
  }
}
</script>

<style>

</style>

