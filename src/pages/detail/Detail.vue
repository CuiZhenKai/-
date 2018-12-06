<template>
    <div>
        <BookInfo :info='info'></BookInfo>
        <commentList :comments='comments'></commentList>
        <div class="comment" v-if="showAdd">
            <textarea 
                v-model="comment"
                class="textarea"
                :maxlength="100"
                placeholder="请输入精彩评论"
                placeholder-class="pla"
            ></textarea>
            <div class="location">
                地理位置:
                <switch color="#009999" :checked='locations' @change="getGeo"/>
                <span class="text-primary">{{locations}}</span>
            </div>
            <div class="phone">
                手机型号:
                <switch color="#009999" :checked='phone' @change="getPho"/>
                <span class="text-primary">{{phone}}</span>
            </div>
            <button @click="addComment" class="btn"  type="primary">发表</button>
        </div>
        <div v-else class="text-footer">
            未登录或者已经评论过不能继续评论
        </div>
        <button open-type='share' class="btn" type="primary" >转发给好友</button>
    </div>
    
</template>


<script>
import {get, post, showModal} from '@/util'
import BookInfo from '@/components/BookInfo'
import commentList from '@/components/commentList'

export default {
  components: {
    BookInfo,
    commentList
  },
  data () {
    return {
      bookid: '',
      info: {},
      comment: '',
      phone: '',
      locations: '',
      userinfo: {},
      comments: []
    }
  },
  computed: {
    showAdd () {
      // 没有登录
      if (!this.userinfo.openId) {
        return false
      }
      // 评论列表查到
      if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
        return false
      }
      return true
    }
  },
  methods: {
    async addComment () {
      if (!this.comment) {
        wx.showModal({
          title: '评论',
          content: '评论内容不可以为空',
          showCancel: false,
          confirmText: '重新评论'
        })
        return
      }
      // 评论内容
      // 手机型号
      // 地理位置
      // 图书id
      // openid
      const data = {
        comment: this.comment,
        phone: this.phone,
        locations: this.locations,
        bookid: this.bookid,
        openid: this.userinfo.openId
      }
      // console.log(data);
      // 请求后台
      try {
        // console.log(data);
        await post('/weapp/addcomment', data)
        // 清空评论列表
        this.comment = ''
        this.getComments()
      } catch (e) {
        showModal('失败')
      }
      // console.log(data);
    },
    async getDetail () {
      const info = await get('/weapp/bookdetail', {id: this.bookid})
      // console.log(info);
      wx.setNavigationBarTitle({
        title: info.title
      })
      this.info = info
    },
    async getComments () {
      const comments = await get('/weapp/commentlist', {bookid: this.bookid})
      this.comments = comments.list || []
    },
    getGeo (e) {
      // dcR2ctZls845senVXCXT5I1hG59iVGk0
      // http://api.map.baidu.com/geocoder/v2/
      const ak = 'dcR2ctZls845senVXCXT5I1hG59iVGk0'
      let url = 'http://api.map.baidu.com/geocoder/v2/'
      if (e.target.value) {
        wx.getLocation({
          success: (geo) => {
            // console.log(geo);
            wx.request({
              url,
              data: {
                location: `${geo.latitude},${geo.longitude}`,
                output: 'json',
                ak
              },
              success: (res) => {
                // formatted_address
                // console.log(res.data.result.formatted_address);
                if (res.data.status === 0) {
                  this.locations = res.data.result.formatted_address
                } else {
                  // console.log("位置")
                  this.locations = '未知地址'
                }
              }
            })
          }
        })
      } else {
        this.locations = ''
      }
    },
    getPho (e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        // console.log(phoneInfo);
        this.phone = phoneInfo.model
      } else {
        // 没选中
        this.phone = ''
      }
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getDetail()
    // 获取评论列表
    this.getComments()
    // console.log(this.comments);
    const userinfo = wx.getStorageSync('userinfo')
    // console.log(userinfo);
    if (userinfo) {
      this.userinfo = userinfo
    }
  }
}
</script>


<style lang="less">
    .comment{
        margin-top: 10px;
        .textarea{
            background: #009999;
            padding: 10rpx;
            width: 730rpx;
            height: 200rpx;
            color:white;
            border-radius: 3%;
        }
        .pla{
            color:white;
        }
        .location{
            margin-top:10px;
        }
        .phone{
            margin-top: 10px;
        }
        .btn{
            margin-top:10rpx;
        }
    }
</style>
