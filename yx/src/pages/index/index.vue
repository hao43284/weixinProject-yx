<template>
  <div class="container" @click="clickHandle('test click', $event)">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/yx_index/main" class="counter">去往Vuex示例页面</a>
  </div>
</template>

<script>
import card from '@/components/card'
// import fly from '@/utils/fly'
import wxp from 'minapp-api-promise'
export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {}
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    async getUserInfo () {
      // 调用登录接口
      // wxp.login({
      //   success: () => {
      //     wx.getUserInfo({
      //       success: (res) => {
      //         this.userInfo = res.userInfo
      //       }
      //     })
      //   }
      // })
      let _login = await wxp.login().catch((err) => {
        console.log('err', err)
      })
      console.log('_login', _login)
      let _userInfo = await wxp.getUserInfo().catch((err) => {
        console.log('err', err)
      })
      // let res = await fly.get('https://www.qimingzizeinan.com/wx/user/loginbycode', {
      //   code: _login.code,
      //   encryptedData: _userInfo.encryptedData,
      //   iv: _userInfo.iv
      // })
      let res = await wxp.request({
        // url: utils.getRequestUrl() + "/get_jwt",
        url: 'https://www.qimingzizeinan.com/wx/user/loginbycode',
        data: {
          code: _login.code,
          encryptedData: _userInfo.encryptedData,
          iv: _userInfo.iv
        },
        header: {
          'content-type': 'application/test'
        }
      })
      console.log('res', res)
      console.log('_userInfo', _userInfo)
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    // this.getUserInfo()
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
</style>
