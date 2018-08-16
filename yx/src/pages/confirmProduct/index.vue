<template>
  <div>
    <ul class="address_wrap">
      <li v-for="(item, index) in list" :key='index' class="address_item">
        <div class="express_user">
          <div>{{item.addr_realname}}</div>
          <div v-if="item.is_default === 1" class="is_default">默认</div>
        </div>
        <div class="address_detail">
          <div>{{item.addr_phone}}</div>
          <div class="detail">{{item.address}}</div>
        </div>
        <div class="opration">
          <div v-if="status === 'modify'">修改</div>
          <div @tap='selectAddress' v-if="status === 'select'">选择</div>
        </div>
      </li>
    </ul>
    <div class="orderInfo">
      <div class="infoItem">
        <div>
          商品合计:
        </div>
        <div>
          ￥12349.50
        </div>
      </div>
      <div class="infoItem">
        <div>
          运费:
        </div>
        <div>
          ￥0.00
        </div>
      </div>
    </div>
    <ul class="item_wrap">
      <li v-for="(item, index) in productList" :key='index'>
        <div class="product_poster_wrap">
          <img class="product_poster" :src="item.img" alt="">
        </div>
        <div class="desc">
          <div class="h1">
            {{item.name}}
          </div>
          <div class="standard">
            {{item.standard}}
          </div>
          <div class="price">
            <div class="price_num">
              ￥{{item.price}}
            </div>
            <div class="opration_add_cut">
              <!-- Increase Decrease -->
              <div class="buy_number">X{{item.buy_total}}</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="payWrap">
      <div class="realPrice">
        实付:￥12345.65
      </div>
      <div class="payBtn">
        付款
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      'list': [
        {
          'addr_phone': '18810712622',
          'address': '北京 北京市 东城区 1',
          'user_id': 6,
          'addr_realname': '王',
          'address_id': 6,
          'is_default': 1,
          'addr_city': '北京 北京市 东城区'
        }
      ],
      productList: [{
        img: 'https://m.360buyimg.com/babel/jfs/t19804/13/914036007/47943/ebfb0613/5b0f6252N7469ca68.jpg',
        name: '每日坚果(4种坚果+3种果干)每日坚果(4种坚果+3种果干)',
        standard: '175克(25克x7袋)',
        price: '35.5',
        buy_total: '5',
        select: true
      }, {
        img: 'https://m.360buyimg.com/babel/jfs/t19804/13/914036007/47943/ebfb0613/5b0f6252N7469ca68.jpg',
        name: '每日坚果(4种坚果+3种果干)每日坚果(4种坚果+3种果干)',
        standard: '175克(25克x7袋)',
        price: '35.5',
        buy_total: '50',
        select: false
      }],
      status: 'select'
    }
  },
  methods: {
    selectAddress () {
      wx.navigateTo({ url: '../address/list/main?status=select&url=confirmProduct/main' })
    }
  }
}
</script>

<style>
page {
  background-color: #F4F4F4;
}
.realPrice {
  padding-left: 15px;
}
.payWrap {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 50px;
  line-height: 50px;
  background-color: #FFF;
  font-size: 16px;
  color: #B32A32;
  display: flex;
  justify-content: space-between;
}
.payBtn {
  background-color: #B32A32;
  color: #FFF;
  width: 30%;
  text-align: center;
}
.orderInfo {
  margin: 10px 0;
  background-color: #FFF;
}
.infoItem {
  display: flex;
  justify-content: space-between;
  width: 96%;
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #333;
  border-bottom: 1px solid #f4f4f4;
}
.infoItem:last-child {
  border: none;
}
.add_address {
  position: fixed;
  left: 50%;
  bottom: 10px;
  transform: translate(-50%, 0);
  width: 80%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border: 1px solid #c04a4e;
  border-radius: 3px;
  color: #c04a4e;
  font-size: 16px;
  background-color: #FFF;
}
.address_wrap {
  width: 94%;
  background-color: #FFF;
  padding: 0 3%;
}
.address_item {
  display: flex;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 10px;
  border-bottom: 1px solid #f4f4f4;
}
.express_user {
  font-size: 16px;
  color: #333;
  width: 15%;
  text-align: center;
  height: 50px;
}
.is_default {
  font-size: 16px;
  border: 1px solid #c04a4e;
  color: #c04a4e;
  border-radius: 3px;
  text-align: center;
  margin-top: 4px;
}
.address_detail {
  font-size: 18px;
  color: #333;
  width: 65%;
  padding-left: 5%;
  height: 50px;
}
.detail {
  font-size: 12px;
  color: #666;
  overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;  
  margin-top: 4px;
}
.opration {
  width: 15%;
  align-items: center;
  background-color: #FFF;
}
.opration div{
  width: 40px;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  border-radius: 3px;
  padding: 0 5px;
  text-align: center;
  border: 1px solid #c04a4e;
  color: #c04a4e;
}


.go_order {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  background-color: #ccc;
}
.select_all {
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
}
.select_all img {
  margin-left: 4px;
  margin-right: 2px;
}
.order_btn_wrap {
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #333;
}
.order_btn {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  color: #FFF;
  margin-left: 5px;
  text-align: center;
  background-color: #b4282d;
}

.opration_add_cut {
  /* border: 1px solid #ccc; */
  border-radius: 2px;
}
.opration_add_cut div {
  width: 30px;
  height: 20px;
  text-align: center;
  line-height: 18px;
  color: #666;
}
.buy_number {
  font-size: 14px;
  color: #333;
  /* border-right: 1px solid #CCC; */
  /* border-left: 1px solid #CCC; */
  padding: 0 5px;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}
.commom_add_cut {
  line-height: 18px;
}
.select_wrap {
  width: 30px;
  display: flex;
  align-items: center;
}
.product_poster_wrap {
  width: 80px;
  height: 80px;
  background-color: #f4f4f4;
  margin-right: 5px;
}
.item_wrap {
  background-color: #FFF;
  padding: 10px 3%;
}
.item_wrap li {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  /* align-items: center; */
  position: relative;
  height: 80px;
  overflow: hidden;
  margin-top: 10px;
}
.h1 {
  overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
  
}
.select {
  width: 24px;
  height: 24px;
}
.product_poster {
  width: 80px;
  height: 80px;
}
.desc {
  width: 235px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-content: flex-start;
  /* align-items: flex-start; */
}
.buy_number .desc {
  align-items: flex-start;
}
.price {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}
.opration_add_cut {
  position: absolute;
  bottom: 6px;
  right: 6px;
  display: flex;
  justify-content: flex-start;
}
.h1 {
  font-size: 16px;
}
.standard {
  font-size: 14px;
  color: #666;
}
.price_num {
  font-size: 14px;
  color: #666;
}
</style>
