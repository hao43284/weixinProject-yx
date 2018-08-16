<template>
  <div>
    <div class="tabBar">
      <div v-for="(item, index) in tabBarList" @tap='tabChange(index)' :key="index" :class="{active: item.active}">
        {{item.title}}
      </div>
    </div>
    <ul>
      <li class="orderItem">
        <div class="orderItem__ttile">
          订单编号:123456
        </div>
        <ul>
          <li class="productItem">
            <div class="productItem__leftBody">
              <img class="img" src="https://m.360buyimg.com/babel/jfs/t19804/13/914036007/47943/ebfb0613/5b0f6252N7469ca68.jpg" alt="">
              <div class="productItem__contentBody">
                <div class="title">
                  新疆大枣两万斤
                </div>
                <div>
                  灰色;L
                </div>
              </div>
            </div>
            <div class="productItem__status">已发货</div>
          </li>
        </ul>
        <div class="orderOperation">
          <div class="">
            总价￥:499.00
          </div>
          <div class="payBtn">
            付款 29:59
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tabBarList: [
        {
          title: '全部',
          active: true
        }, {
          title: '待付款',
          active: false
        },
        {
          title: '已付款',
          active: false
        },
        {
          title: '已发货',
          active: false
        },
        {
          title: '已完成',
          active: false
        }
      ],
      productItem: [{
        img: 'https://m.360buyimg.com/babel/jfs/t19804/13/914036007/47943/ebfb0613/5b0f6252N7469ca68.jpg'
      }]
    }
  },
  methods: {
    tabChange (index) {
      this.tabBarList.forEach((item, i) => {
        if (i === index) {
          item.active = true
        } else {
          item.active = false
        }
      })
    }
  }
}
</script>
<style>
page {
  background-color: #f4f4f4;
}
.orderOperation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #333;
  border-top: 1px solid #C4C4C4;
  height: 50px;
  line-height: 50px;
}
.payBtn {
  height: 30px;
  border: 1px solid #B32A32;
  color: #B32A32;
  line-height: 30px;
  border-radius: 5px;
  font-size: 14px;
  padding: 0 10px;
}

.productItem .img {
  width: 80px;
  height: 80px;
}
.orderItem__ttile {
  font-size: 16px;
  color: #333;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #C4C4C4;
}
.orderItem {
  background-color: #FFF;
  margin-top: 10px; 
  padding: 0 3%;
}
.productItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  /* flex-direction: column; */
}
.productItem__leftBody {
  display: flex;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
}
.productItem__contentBody {
  margin-left: 10px;
  font-size: 14px;
  color: #666;
}
.productItem__contentBody .title {
  font-size: 16px;
  color: #333;
}
.productItem__status {
  font-size: 16px;
  color: #B32A32;
}

.tabBar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  background-color: #FFF;
}
.tabBar div {
  width: 25%;
  text-align: center;
  height: 40px;
  line-height: 40px;
}
.tabBar div.active {
  height: 38px;
  line-height: 40px;
  border-bottom: 2px solid #B32A32;
  color: #B32A32;
}
</style>
