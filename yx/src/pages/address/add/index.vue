<template>
  <div>
    <div class="input_wrap">
      <input @change='name_change' class="input" type="text" placeholder="收件人姓名">
      <input @change="phone_change" class="input" type="text" placeholder="手机号码">  
      <input class="input" disabled :value="input_address" type="text" @tap='open' placeholder="省份 城市 区县">
      <input @change="detail_change" class="input" type="text" placeholder="详细地址">
      <div class="set_default">
        <img @tap='checkFun' v-if="is_default" class="checkbox" src="../../../../static/icon/check_box.png" alt="">
        <img @tap='checkFun' v-else class="checkbox" src="../../../../static/icon/check-box-blank.png" alt="">
        默认地址
      </div>
    </div>
    <div class="opration_wrap">
      <div @tap="save_address">
        保存
      </div>
      <!-- <div class="delete_btn">
        删除
      </div> -->
    </div>
    <div  class="citypicker"  v-if="condition">
      <picker-view indicator-style="height: 50px;" style="width: 100%; height: 300px;" :value="value" @change="change" class="citybody">
        <div class="cityheader">
          <div class="city-true" @tap="close">确定</div>
        </div> 
        <picker-view-column>
          <view v-for="(item,index) in provinces" :key="index" style="line-height: 50px;padding-left:10px;">{{item}}</view>
        </picker-view-column>
        <picker-view-column>
          <view v-for="(item,index) in citys" :key="index" style="line-height: 50px;padding-left:10px;">{{item}}</view>
        </picker-view-column>
        <picker-view-column>
          <view v-for="(item,index) in countys" :key="index" style="line-height: 50px;padding-left:10px;">{{item}}</view>
        </picker-view-column>
      </picker-view>
    </div>
  </div>
</template>
<script>
// var tcity = require("../../../utils/citys.js")
import tcity from '@/utils/city'
import fly from '@/utils/fly'
export default {
  data () {
    return {
      condition: false,
      provinces: [],
      province: '',
      citys: [],
      city: '',
      countys: [],
      county: '',
      value: [0, 0, 0],
      values: [0, 0, 0],
      input_address: '',
      is_default: false,
      save_data: {
        name_input: '',
        phone_input: '',
        address_input: '',
        detail_input: ''
      }
    }
  },
  onShow () {
    var that = this
    tcity.init(that)
    var cityData = that.cityData
    const provinces = []
    const citys = []
    const countys = []
    for (let i = 0; i < cityData.length; i++) {
      provinces.push(cityData[i].name)
    }
    // console.log('省份完成')
    for (let i = 0; i < cityData[0].sub.length; i++) {
      citys.push(cityData[0].sub[i].name)
    }
    // console.log('city完成')
    for (let i = 0; i < cityData[0].sub[0].sub.length; i++) {
      countys.push(cityData[0].sub[0].sub[i].name)
    }

    this.provinces = provinces
    this.citys = citys
    this.countys = countys
    this.province = cityData[0].name
    this.city = cityData[0].sub[0].name
    this.county = cityData[0].sub[0].sub[0].name
  },
  methods: {
    checkFun () {
      this.is_default = !this.is_default
    },
    name_change (e) {
      Object.assign(this.save_data, {
        name_input: e.target.value
      })
    },
    phone_change (e) {
      Object.assign(this.save_data, {
        phone_input: e.target.value
      })
    },
    detail_change (e) {
      Object.assign(this.save_data, {
        detail_input: e.target.value
      })
    },
    save_address () {
      console.log('地址保存', this.save_data)
      console.log('保存地址')
      fly.get('wx/api/addReceiptAddress', {
        openid: wx.getStorageSync('openid'),
        province: this.province,
        city: this.city,
        area: this.county,
        detail: this.save_data.detail_input,
        realname: this.save_data.name_input,
        phone: this.save_data.phone_input,
        isDefault: this.is_default ? 1 : 0
      }).then(res => {
        if (res.code === 1) {
          // 跳转列表页
          wx.navigateTo({
            url: '../address_list/main?status=modify'
          })
        }
      }).then(err => {
        if (err) return ''
      })
    },
    open () {
      this.condition = true
    },
    close () {
      this.condition = false
      this.input_address = this.province + ' ' + this.county + ' ' + this.city
      Object.assign(this.save_data, {
        address_input: this.input_address
      })
      // console.log('省市区', this.province, this.county, this.city)
    },
    change: function (e) {
      console.log(e)
      var val = e.target.value
      var t = this.values
      var cityData = this.cityData
      if (val[0] !== t[0]) {
        console.log('province no ')
        const citys = []
        const countys = []

        for (let i = 0; i < cityData[val[0]].sub.length; i++) {
          citys.push(cityData[val[0]].sub[i].name)
        }
        for (let i = 0; i < cityData[val[0]].sub[0].sub.length; i++) {
          countys.push(cityData[val[0]].sub[0].sub[i].name)
        }
        this.province = this.provinces[val[0]]
        this.city = cityData[val[0]].sub[0].name
        this.citys = citys
        this.county = cityData[val[0]].sub[0].sub[0].name
        this.countys = countys
        this.values = val
        this.value = [val[0], 0, 0]

        return ''
      }
      if (val[1] !== t[1]) {
        console.log('city no')
        const countys = []

        for (let i = 0; i < cityData[val[0]].sub[val[1]].sub.length; i++) {
          countys.push(cityData[val[0]].sub[val[1]].sub[i].name)
        }
        this.city = this.citys[val[1]]
        this.county = cityData[val[0]].sub[val[1]].sub[0].name
        this.countys = countys
        this.values = val
        this.value = [val[0], val[1], 0]
        return ''
      }

      if (val[2] !== t[2]) {
        console.log('county no', val)
        this.county = this.countys[val[2]]
        this.values = val
        this.value = [val[0], val[1], val[2]]
        return ''
      }
    }
  }
}
</script>

<style>
.input_wrap {
  width: 96%;
  margin: 0 auto;
}
.input {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #333;
  border-bottom: 1px solid #f4f4f4;
}
.set_default {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #333;
  margin-top: 10px;
}
.checkbox {
  width: 20px;
  height: 20px;
  margin-right: 6px;
}
.opration_wrap {
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 16px;
  color: #FFF;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #b4282d;

}
.opration_wrap div {
  width: 100%;
}
.delete_btn {
  background-color: #ccc;
}

.citypickers{
  position: fixed;
  height: 100%;
  width: 100%;
  min-height: 100%;
  background-color: red;
}

.citypicker{
  
}
.citybody {
  position: fixed;
  bottom: 0px;
  background-color: #f4f4f4;
}

.cityheader {
  position: absolute;
  top:0px;
  width: 100%;
  z-index: 4;
}

.city-cancel {
  float: left;
  margin: 20rpx;
  color: #818181;
}

.city-true {
  float: right;
  margin: 20rpx;
  color: #2FB42E
}

.section .picker {
  background-color: #fff;
  border-bottom: 1px #d9d9d9 solid;
  border-top: 1px #d9d9d9 solid;
  padding: 20rpx;
}
</style>
