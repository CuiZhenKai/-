<template>
   <div class="rate">
       <span>☆☆☆☆☆</span>
       <!-- :style重写宽度 -->
       <div class="hollow" :style="style">
            ★★★★★
       </div>
   </div>
</template>


<script>
export default {
  // data(){
  //     return{
  //       style:`width:${(this.value)/2}em`
  //     }
  // },
  //  <!-- ★☆ -->
  props: {
    value: {type: [Number, String], default: '0'}
  },
  computed: {
    style () {
      return `width:${this.value / 2}em`
    }
  }
}
</script>


<style lang="less">
    .rate{
        position:relative;
        display: inline-block;
        // color: red;

        .hollow{
            position: absolute;
            display: inline-block;
            top:0;
            left:0;
            width: 0;
            overflow: hidden;
            color:lightcyan;
        }
    }
</style>


