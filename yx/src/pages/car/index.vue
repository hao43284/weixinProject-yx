<template>
  <div>
    <ul class="item_wrap">
      <li v-for="(item, index) in list" :key='index'>
        <div class="select_wrap">
          <img @tap='selectFun(index)' v-if="item.select === true" class="select" src="../../../static/icon/selected.png" alt="">
          <img @tap='selectFun(index)' v-else class="select" src="../../../static/icon/select.png" alt="">
        </div>
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
              <div @tap='decrease(index)' class="add commom_add_cut">-</div>
              <div class="buy_number">{{item.buy_total}}</div>
              <div @tap='increase(index)' class="cut commom_add_cut">+</div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="go_order">
      <div class="select_all">
        <img v-if="selectAll" class="select" src="../../../static/icon/selected.png" alt="">
        <img v-else class="select" src="../../../static/icon/select.png" alt="">
        <div>
          全选
        </div>
      </div>
      <div class="order_btn_wrap">
        <div>￥{{allPrice}}</div>
        <div class="order_btn">下单</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [{
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
      selectAll: false,
      allPrice: 0
    }
  },
  methods: {
    checkAll () {
      let isAll = this.list.every((el, i, arr) => {
        return el.select
      })
      this.selectAll = isAll
    },
    selectFun (index) {
      this.list[index]['select'] = !this.list[index]['select']
      this.checkAll()
      this.calcTotalPrice()
    },
    increase (index) {
      let _buyTotal = Number(this.list[index]['buy_total'])
      if (_buyTotal <= 1) {
        this.list[index]['buy_total'] = '1'
      } else {
        this.list[index]['buy_total'] = String(_buyTotal + 1)
      }
      this.calcTotalPrice()
    },
    decrease (index) {
      let _buyTotal = Number(this.list[index]['buy_total'])
      if (_buyTotal <= 1) {
        this.list[index]['buy_total'] = '1'
      } else {
        this.list[index]['buy_total'] = String(_buyTotal - 1)
      }
      this.calcTotalPrice()
    },
    calcTotalPrice () {
      let _price = this.list.reduce((pre, next) => {
        if (next.select) {
          return Number(pre.price) * Number(pre.buy_total) + Number(next.price) * Number(next.buy_total)
        } else {
          return Number(pre.price) * Number(pre.buy_total) + 0
        }
      })
      this.allPrice = _price
    }
  },
  onLoad () {
    this.calcTotalPrice()
    this.checkAll()
  }
}
</script>

<style>
page {
  background-color: #f4f4f4;
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
  border: 1px solid #ccc;
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
  border-right: 1px solid #CCC;
  border-left: 1px solid #CCC;
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

