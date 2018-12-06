<template>
    <div class="bookinfo">
        <div class="thumb">
            <img class="back"
                :src="info.image" 
                alt="" 
                mode="aspectFill"
            >
            <img 
                :src="info.image"
                class="img"
                mode="aspectFit"
            >
            <div class="info">
                <div class="title">
                    {{info.title}}
                </div>
                <div class="author">
                    {{info.author}}
                </div>
            </div>
        </div>
        <div class="intro">
            <div class="detail">
                <img class="avatar" :src="userinfo.avatarUrl" mode="aspectFit">
                {{userinfo.nickName}}
                <div class="right">
                    评分:{{info.rate}}
                </div>
            </div>
            <div class="detail">
                {{info.publisher}}
                <div class="right">
                    单价:{{info.price}}
                </div>
            </div>
            <div class="summary">
                本书简介:
                <p  v-for="(sum,i) in info.summary" :key="i">{{sum}}</p>
            </div>
        </div>
    </div>
</template>


<script>
export default {
  props: ['info'],
  computed: {
    userinfo () {
      return this.info.user_info || {}
    }
  }
}
</script>


<style lang="less">
    .bookinfo{
        font-size: 14px;
        .intro{
            border:1px solid rgb(93, 194, 228);
            padding: 20rpx 0;
            border-radius: 3%;
            width: 98%;
            height: auto;
            margin:10rpx auto;
        }
        .summary{
            margin-top:10px;
            padding:0 15px;
            p{
                text-indent: 2em;
                font-size: 14px;
            }
        }
        .right{
            float:right;
        }
        .detail{
            padding: 5px 10px;

            .avatar{
                width: 20px;
                height: 20px;
                border-radius: 50%;
                vertical-align: middle;
            }
        }
        .thumb{
            overflow: hidden;
            width: 750rpx;
            height: 500rpx;
            position: relative;
            .back{
                width: 100%;
                filter: blur(15px);
            }
            .img{
                position: absolute;
                width: 100%;
                height: 300rpx;
                left: 0;
                top:30rpx;
            }
            .info{
                color:white;
                position: absolute;
                width: 100%;
                left: 0;
                top:380rpx;
                text-align: center;
                .title{
                    font-size: 20px;
                }
                .author{
                    font-size: 14px;
                }
            }
        }
    }
</style>
