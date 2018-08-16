<template>
  <div>
    <!-- 轮播图 -->
    <swiper indicator-dots="true"
      autoplay="true" interval="3000" duration="1000">
      <block v-for="(item,index) in interfaceData.bannerlist" v-bind:key='index'>
        <swiper-item>
          <navigator :url="item.type === 2? '../index/main' : '../logs/main'">
            <image class="swiper_img" :src="item.navigation_app_url"/>
          </navigator>
          <!-- <image src="{{item.}}" class="slide-image" width="355" height="150"/> -->
        </swiper-item>
      </block>
    </swiper>
    <div class="category_list">
      <div v-for="(item, index) in interfaceData.navigationlist" v-bind:key="index" class="category_item">
        <navigator url="../index/main">
          <div class="category_item_wrap">
            <img :src="item.categoryIconUrl" alt="">
            <div>
              {{item.categoryName}}
            </div>
          </div>
        </navigator>
      </div>
    </div>
    <div class="product_wrap">
      <product :list="interfaceData.goodslist"></product>
    </div>
  </div>
</template>

<script>
import {loadingData, hideLoadingData, showErrorModel, handleUnauthorized} from '@/utils/dataLoding'
// import {loadingData} from '@/utils/dataLoding'
import fly from '@/utils/fly'
import product from '@/components/product'
// import wxp from 'minapp-api-promise'

export default {
  data () {
    return {
      interfaceData: {}
    }
  },
  components: {
    product
  },
  methods: {
    async getIndexData () {
      loadingData()
      let resStatus = await fly.get('wx/api/index', {
        'openid': wx.getStorageSync('openid')
      }).then((res) => {
        let _data = res
        console.log('res', res)
        hideLoadingData()
        if (_data.code === 1) {
          this.interfaceData = res.result
          console.log('this.interfaceData', this.interfaceData)
        } else {
          showErrorModel(_data.result)
        }
      }).then((err) => {
        if (err) {
          showErrorModel('出错啦，请重试')
        }
      }).catch((err) => {
        handleUnauthorized(err)
      })
      console.log('resStatus', resStatus)
    }
  },
  created () {
  },
  onShow () {
    let _existToken = wx.getStorageSync('header')
    if (!_existToken.Authorization) {
      wx.navigateTo({
        url: '../login/main'
      })
    } else {
      this.getIndexData()
    }
  }
}
</script>

<style>
page {
  background-color: #f4f4f4;
}
.swiper_img {
  width: 100%;
  height: 150px;
}
.category_list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  background-color: #FFF;
  margin: 10px 0;
  padding:10px 0;
}
.category_list img {
  width: 40px;
  height: 40px;
}
.category_item {
  width: 25%;
}
.category_item div {
  margin-top: 5px;
}
.category_item_wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 14px;
  color: #333;
  margin-top: 8px;
}
</style>

