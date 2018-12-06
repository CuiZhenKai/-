<template>
  <div class="container">
    <div class="userinfo">
      <img :src="userInfo.avatarUrl" alt=""/>
      <p>{{userInfo.nickName}}</p>
      <p class="left" v-if="userInfo.openId">身份:初级</p>
      <!-- &#9818 -->
      <p class="right" v-if="userInfo.openId">开通会员</p>
    </div>
    <YearProgress></YearProgress>
    <button class="button" type="primary" hover-class="btn-active" @click="scanBook" v-if="userInfo.openId">添加图书</button>
    <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="doLogin" type="warn" v-if="!userInfo.openId" hover-class="btn-active">点击登录</button>
  </div>
</template>

<script>
import YearProgress from '@/components/YearProgress'
import {showSuccess, post, showModal} from '../../util'
import qcloud from 'wafer2-client-sdk'
import config from '../../config'
export default {
  components: {
    YearProgress
  },
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    // 获取用户信息
    this.userInfo = wx.getStorageSync('userinfo')
    // 如果没有,显示默认
    if (!this.userInfo) {
      this.userInfo = {
        avatarUrl: '../../../static/img/unlogin.png',
        nickName: '未登录'
      }
    }
  },
  methods: {
    doLogin: function (e) {
      // let user = wx.getStorageSync('userinfo')
      const self = this
      qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success: function (userInfo) {
          // console.log('登录成功', userInfo)
          showSuccess('正在登录')
          // 登录成功,存入localStorge
          wx.setStorageSync('userinfo', userInfo)
          self.userInfo = userInfo
        },
        fail: function (err) {
          console.log('登录失败', err)
        }
      })
    },
    // 添加图书
    async addBook (isbn) {
      // console.log(isbn);
      // console.log("执行");
      // isbd码
      // 发起请求
      const res = await post('/weapp/addbook', {
        isbn,
        openid: this.userInfo.openId
      })
      // console.log(res);
      // if(res.code==0&&res.data.title){
      //   showSuccess("添加成功");
      // }
      showModal('添加成功', `${res.title}添加成功`)
    },
    // 扫描图书
    scanBook () {
      const self = this
      wx.scanCode({
        success (res) {
          // 请求到了数据,发起请求
          if (res.result) {
            self.addBook(res.result)
            // console.log("执行")
          }
          // console.log(res)
        }
      })
    }
  }
}
</script>

<style lang="less">
.container{
  .userinfo{
    text-align: center;
    background-color: #009999;
    width: 100%;
    height: auto;
    padding: 10rpx 0rpx 85rpx 0rpx;
    color:white;
    img{
      width: 168rpx;
      height: 168rpx;
      margin: 20rpx;
      border-radius: 50%;
    }
    p.left{
      margin-top: 30rpx;
      float: left;
      font-size: 30rpx;
    }
    p.right{
      margin-top: 30rpx;
      float: right;
      font-size: 30rpx;
    }
  }
  .button{
    margin-top: 10rpx;
    margin-bottom:10rpx;
    background-color: #253d3d;
    width: 90%;
  }
  button{
    margin-top: 10rpx;
    margin-bottom:10rpx;
    width: 90%;
  }
  .btn-active{
    background-color:lightseagreen;
  }
}
</style>
