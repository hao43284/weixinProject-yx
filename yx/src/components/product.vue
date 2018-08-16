<template>
  <div class="product_wrap">
    <div class="product_item" v-for="(item, index) in list" v-bind:key="index">
      <img class="product_poster" :src="item.goods_pic" alt="">
      <div class="product_info">
        <div class="product_name">
          {{item.goods_name}}
        </div>
        <div class="sell_info">
          <div>
            售价: {{item.goods_price}}
          </div>
          <div>
            已售: {{item.sell_count}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list']
}
</script>

<style>
.product_item {
  width: 185px;
  margin-bottom: 5px;
}
.product_poster {
  width: 185px;
  height: 185px;
}
/* 商品 */
.product_wrap {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}
.product_wrap img {
  display: block;
}
.product_name {
  font-size: 14px;
  overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.product_info {
  background-color: #FFF;
  padding: 5px 3%;
}
.sell_info {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 12px;
  color: #999;
}
</style>
