<template>
    <div class="comment-list">
        <div class="page-title" v-if="commentShow">
            我的评论
        </div>
        <div class="comment" v-for="comment in comments" :key="comment.id" @click="handelClick(comment)">
            <div class="user">
                <div class="inline">
                    <img :src="comment.image" class="avatar" mode='aspectFit'>
                    {{comment.title}}:
                </div>
            </div>
            <div class="content">
                {{comment.comment}}
            </div>
        </div>
    </div>
</template>


<script>
export default {
  data(){
      return {
          commentShow:false
      }
  },
  props: ['comments','type'],
  methods:{
      handelClick(comment){
          if(this.type === 'comment'){
              wx.navigateTo({
                url: '/pages/detail/main?id='+comment.bookid
               })
          }
      }
  }
}
</script>


<style lang="less">
    .comment-list{
        background:#009999;
        color:white;
        font-size: 16px;
        padding: 10rpx 0;
        .comment{
            background:#fff;
            color:#000;
            font-size: 14px;
            margin-bottom: 10px;
            padding: 5px 20px;
            .content{
                margin:10px 0;
                color:#009999;
                font-weight: bold;
            }
            .user{
                .avatar{
                    width:20px;
                    height: 20px;
                    border-radius: 50%;
                }
            }
        }
        
    }
</style>
