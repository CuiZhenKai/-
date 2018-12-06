<template>
  <div class="container">
    <SubTitle :top5='commentMe'></SubTitle>
    <commentList type="comment" :comments='comments' v-if='userinfo.openId'></commentList>
    <div v-if="userinfo.openId">
      <SubTitle :top5='addMe'></SubTitle>
      <Card v-for="book in books" :key="book.id" :book='book'></Card>
      <div v-if="!books.length">还没添加过</div>
    </div>
  </div>
</template>

<script>
import {get, post, showModal} from '@/util'
import commentList from '@/components/commentList'
import Card from '@/components/Card'
import SubTitle from '@/components/SubTitle'
export default {
  data(){
    return{
      comments:[],
      userinfo:{},
      books:[],
      addMe:['我的添加'],
      commentMe:['我的评论']
    }
    
  },
  components:{
    commentList,
    Card,
    SubTitle
  },
  methods:{
    init(){
      wx.showNavigationBarLoading();
      this.getComments();
      this.getBooks();
      wx.hideNavigationBarLoading();
    },
    async getComments(){
      const comments = await get('/weapp/commentuser',{
        openid:this.userinfo.openId
      });
      this.comments = comments.list;
    },
    async getBooks(){
      const books = await get('/weapp/booklist',{
        openid:this.userinfo.openId
      });
      this.books = books.list;
    }
  },
  onPullDownRefresh(){
    this.init();
    wx.stopPullDownRefresh();
  },
  onShow() {
    if(!this.userinfo.openId){
      let userinfo = wx.getStorageSync('userinfo');
      if(userinfo){
        this.userinfo = userinfo;
        this.init();
      }
    }
  }
}
</script>

<style lang="less">

</style>
