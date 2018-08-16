<template>
  <div class="me_container">
    <div class="user_avatar">
      <img class="avatar" src="../../../static/_temp/aaa.jpeg" alt="">
      <div class="user_info_wrap">
        <div>你说,我听</div>
        <div class="type">微信用户</div>
      </div>
    </div>
    <ul class="me_option_list">
      <li class="option_item">
        <div class="l_title">
          <img class="l_icon" src="../../../static/icon/me_order.png" alt="">
          <div>我的订单</div>
        </div>
        <img class="r_icon" src="../../../static/icon/me_right.png" alt="">
      </li>
      <li class="option_item">
        <div class="l_title">
          <img class="l_icon" src="../../../static/icon/me_coupon.png" alt="">
          <div>优惠券</div>
        </div>
        <img class="r_icon" src="../../../static/icon/me_right.png" alt="">
      </li>
      <li class="option_item" @tap='navigateAddress'>
        <div class="l_title">
          <img class="l_icon" src="../../../static/icon/me_address.png" alt="">
          <div>地址管理</div>
        </div>
        <img class="r_icon" src="../../../static/icon/me_right.png" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    navigateAddress () {
      wx.navigateTo({ url: '../address/list/main?status=modify' })
    }
  }
}
</script>

<style>
.me_container {
  width: 96%;
  margin: 0 auto;
}
.user_avatar {
  width: 100%;
  height: 140px;
  background-color: #151515;
  display: flex;
  align-items: center;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50px;
  margin-left: 15px;
}
.user_info_wrap {
  color: #FFF;
  display: flex;
  font-size: 18px;
  flex-direction: column;
  margin-left: 10px;
}
.user_info_wrap .type {
  font-size: 14px;
  color: #666;
}
.option_item {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f4f4f4;
}
.option_item .l_icon {
  width: 20px;
  height: 20px;
}
.l_title {
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: #333;
}
.l_title div {
  margin-left: 4px;
}
.r_icon {
  width: 16px;
  height: 16px;
}
.me_option_list {
  padding-top: 20px;
}
</style>

