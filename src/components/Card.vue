<template>
  <a :href="detailUrl">
    <div class="book-card">
        <div class="thumb"  @click.stop="preview">
            <img :src="book.image" class="image" mode="aspectFit">
        </div>
        <div class="detail">
            <div class="row">
                <div class="onlyContent">
                    From:<span>{{book.user_info.nickName}}</span>&nbsp;&nbsp;&nbsp;Come-out:<span>{{book.publisher}}</span>
                </div>
            </div>
            <div class="row">
                <div class="right">
                    推荐评分:{{book.rate}}&nbsp;
                    <!-- <Rate :value="book.rate"></Rate> -->
                </div>
                <div class="left">
                    作者:{{book.author?book.author:'无'}}
                </div>
            </div>
            <div class="row">
                <div class="right">
                    {{book.title}}
                </div>
                <div class="left">
                    浏览量:{{book.count}}
                </div>
            </div>
            
        </div>
    </div>
   </a>
</template>


<script>
// 导入星级组件
import Rate from '@/components/Rate'
export default {
  // 声明组件
  components: {
    Rate
  },
  props: ['book'],
  computed: {
    detailUrl () {
      return '/pages/detail/main?id=' + this.book.id
    }
  },
  methods: {
    preview () {
      wx.previewImage({
        current: this.book.image,
        urls: [this.book.image] // 需要预览的图片http链接列表
      })
    }
  }
}
</script>


<style lang="less">
    // .book-card{
    //     padding: 5px;
    //     overflow: hidden;
    //     margin-top: 5px;
    //     margin-bottom: 5px;
    //     .thumb{
    //         width: 90px;
    //         height: 90px;
    //         float: left;
    //         margin: 0 auto;
    //         overflow: hidden;
    //         .image{
    //             width: 100%;
    //             height: 100%;
    //         }
    //     }
    // }
    .book-card{
        width: 88%;
        height: auto;
        background: transparent;
        border:1rpx solid #009999;
        margin:30rpx auto;
        border-radius: 3%;
        padding:75rpx 35rpx;
        color:#009999;
        font-weight: bold;
        font-size: 35rpx;
        .thumb{
            width: 90px;
            height: 90px;
            float: right;
            margin: 0 auto;
            overflow: hidden;
            .image{
                width: 100%;
                height: 100%;
            }
        }
        .detail{
            .onlyContent{
                font-size: 25rpx;

                span{
                    font-size: 30rpx;
                    color:#3B200C;
                    font-weight: bold;
                }
            }
        }
    }
</style>


