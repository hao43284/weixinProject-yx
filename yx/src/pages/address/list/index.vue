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
    <div class="add_address">
      新增地址
    </div>
  </div>
</template>

<script>
import {loadingData, hideLoadingData, showErrorModel, handleUnauthorized} from '@/utils/dataLoding'
import fly from '@/utils/fly'
export default {
  data () {
    return {
      list: [],
      status: '',
      navigateToUrl: ''
    }
  },
  methods: {
    async getList () {
      loadingData()
      let resStatus = await fly.get('wx/api/getReceiptAddress', {
        'openid': wx.getStorageSync('openid')
      }).then((res) => {
        let _data = res
        console.log('res', res)
        hideLoadingData()
        if (_data.code === 1) {
          this.list = _data.result.addrlist
          console.log('this.list', this.list)
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
    },
    selectAddress () {
      if (this.navigateToUrl === 'confirmProduct/main') {
        wx.navigateTo({url: '../../' + this.navigateToUrl})
      } else {
        wx.navigateTo({url: '../../' + this.navigateToUrl})
      }
    }
  },
  onLoad () {
    this.getList()
    console.log('this.$root.$mp.query', this.$root.$mp.query)
    this.status = this.$root.$mp.query.status
    this.navigateToUrl = this.$root.$mp.query.url
  }
}
</script>

<style>
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
  width: 96%;
  margin: 0 auto;
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
</style>

