<template>
    <div class="swiper">
        <swiper
            :indicator-dots='true'
            indicator-color='#009999'
            indicator-active-color="rgb(178, 32, 117)"
            :autoplay='true'
            :interval='6000'
            :duration='1000'
            :circular='true'
        >
            <div :key="imgindex" v-for="(top,imgindex) in imgUrls">
                <swiper-item>
                    <img 
                        mode='aspectFit' 
                        class="slider-image" 
                        :src="img.image" 
                        alt=""
                        v-for="img in top"
                        :key="img.id"
                        @click="bookDetail(img)"
                    >
                </swiper-item>
            </div>
        </swiper>
    </div>
</template>

<script>
export default {
  props: ['tops'],
  computed: {
    imgUrls () {
      let res = this.tops
      return [res.slice(0, 3), res.slice(3, 5)]
    }
  },
  mounted () {
    // console.log(this.imgUrls);
  },
  methods: {
    bookDetail (img) {
      wx.navigateTo({
        url: '/pages/detail/main?id=' + img.id
      })
    }
  }
}
</script>

<style lang="less">
    .swiper{
        margin:10rpx auto;
        border-radius: 3%;
        padding:20rpx 0 0 0;
        .slider-image{
            width: 33%;
            height: 250rpx;
        }
    }
</style>
