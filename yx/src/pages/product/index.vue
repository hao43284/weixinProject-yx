<template>
  <div>
    <div>
      <video class="video" :src="video" controls ></video>
    </div>
    <div class="productMiniDesc">
      <div class="productName">
        {{interfaceData.goods.goods_name}}
      </div>
      <div class="productPrice">
        ￥{{interfaceData.goods.goods_price}}
      </div>
    </div>
    <div class="selectStandard">
      数量规格选择
    </div>
    <div class="productBodyDesc">
      <wxParse :content="article" @preview="preview" @navigate="navigate" />
    </div>
    <div class="buyOperationWrap">
      <div class="leftBtn">
        <div class="homeBg"></div>
        <div class="shopBG"></div>
      </div>
      <div class="rightBtn">
        <div class="immediately">
          立刻购买
        </div>
        <div class="addCar">
          加入购物车
        </div>
      </div>
    </div>
</template>
<script>
import wxParse from 'mpvue-wxparse'

import {loadingData, hideLoadingData, showErrorModel, handleUnauthorized} from '@/utils/dataLoding'
// import {loadingData} from '@/utils/dataLoding'
import fly from '@/utils/fly'

export default {
  components: {
    wxParse
  },
  data () {
    return {
      article: '<div>我是HTML代码</div>',
      interfaceData: {}
    }
  },
  // methods: {
  //   preview (src, e) {
  //     // do something
  //   },
  //   navigate (href, e) {
  //     // do something
  //   }
  // },
  methods: {
    async getIndexData (navigationid) {
      loadingData()
      console.log('getIndexData')
      let resStatus = await fly.get('wx/api/selectCommodityDetails', {
        'openid': wx.getStorageSync('openid'),
        'productid': navigationid
      }).then((res) => {
        let _data = res
        console.log('res', res)
        hideLoadingData()
        if (_data.code === 1) {
          this.interfaceData = res.result
          console.log('this.interfaceData', this.interfaceData)
        } else {
          showErrorModel(_data.result)
          console.log('getIndexData1')
        }
      }).then((err) => {
        if (err) {
          showErrorModel('出错啦，请重试')
          console.log('getIndexData2')
        }
      }).catch((err) => {
        handleUnauthorized(err)
        console.log('getIndexData2')
      })
      console.log('resStatus', resStatus)
    }
  },
  onLoad: function (option) {
    var navigationid = option.navigation_id
    // this.getIndexData()
    console.log('navigation_id', navigationid)
    this.getIndexData(navigationid)
  },
  onShow () {
    console.log('onShow')
    let _existToken = wx.getStorageSync('header')
    if (!_existToken.Authorization) {
      wx.navigateTo({
        url: '../login/main'
      })
    } else {
      //  this.getIndexData()
    }
  }
}
</script>

<style>
@import url("~mpvue-wxparse/src/wxParse.css");
page {
  background-color: #f4f4f4;
}
.leftBtn {
  display: flex;
  justify-content: flex-start;
}
.leftBtn div {
  width: 50px;
  height: 100%;
  border-right: 1px solid rgb(53, 13, 13);
}
.homeBg {
  background: url('../../../static/icon/home.png') no-repeat;
  background-size: 24px;
  background-position: center;
}
.shopBG {
  background: url('../../../static/icon/car.png') no-repeat;
  background-size: 24px;
  background-position: center;
}
.buyOperationWrap {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #FAFAFA;
}
.rightBtn {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 16px;
  color: #333;
  height: 100%;
}
.rightBtn div {
  padding: 0 10px;
  height: 100%;
  border-left: 1px solid #eee;
}
.rightBtn div:last-child {
  background-color: #B7292E;
  color: #FFF;
}


.video {
  width: 100%;
  height: 220px;
}
.productMiniDesc {
  background-color: #FFF;
  padding: 10px 3%;
}
.productName {
  font-size: 16px;
  color: #333;
}
.productPrice {
  color: #B7292E;
  font-size: 16px;
}
.selectStandard {
  margin-top: 10px;
  padding: 0 3%;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  color: #333;
  background: url('../../../static/icon/me_right.png') no-repeat;
  background-size: 18px 18px;
  background-position: center right;
  background-color: #FFF;
}
.productBodyDesc {
  margin-top: 10px;
  background-color: #FFF;
}
</style>
