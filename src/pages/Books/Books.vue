<template>
  <div>
    <SubTitle :top5='top5'></SubTitle>
    <TopSwiper :tops='tops'></TopSwiper>
    <SubTitle :top5='visit'></SubTitle>
    <Card v-for="book in books" :key="book.id" :book="book"></Card>
    <p class="text-footer" v-if="!more" >
      我是有底线的
    </p>
  </div>
</template>

<script>
import {get} from '@/util'
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'
import SubTitle from '@/components/SubTitle'
export default {
  // 声明组件
  components: {
    Card,
    TopSwiper,
    SubTitle
  },
  data () {
    return {
      books: [],
      page: 0,
      more: true,
      tops: [],
      top5: ['今日Top5'],
      visit: ['图书榜']
    }
  },
  created () {

  },
  mounted () {
    this.getList(true)
    this.getTop()
  },
  methods: {
    async getList (init) {
      if (init) {
        this.page = 0
        this.more = true
      }
      wx.showNavigationBarLoading()
      const books = await get('/weapp/booklist', {page: this.page})
      this.books = books.list
      if (this.books.length < 3 && this.page > 0) {
        this.more = false
      }
      if (init) {
        this.books = books.list
        wx.stopPullDownRefresh()
      } else {
        /// 下拉刷新
        this.books = this.books.concat(books.list)
      }

      wx.hideNavigationBarLoading()
    },
    async getTop () {
      const tops = await get('/weapp/top')
      this.tops = tops.list
    }
  },
  onPullDownRefresh () {
    // console.log("下拉");
    this.getList(true)
    this.getTop()
  },
  onReachBottom () {
    if (!this.more) {
      // 没有更多
      return
    }
    this.page = this.page + 1
    this.getList()
  }
}
</script>

<style lang="less">
</style>
