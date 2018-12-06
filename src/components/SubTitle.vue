<template>
    <div class="top5">·&nbsp;{{top5}}&nbsp;·</div>
</template>
<script>
export default{
  data () {
    top5:this.top5
  },
  props: ['top5']
}
</script>
<style lang="less">
    .top5{
        width: 50%;
        margin:10rpx auto;
        text-align: center;
        color: rgb(178, 32, 117);
        font-weight: bold;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        border-bottom: 1px dashed #c1f7f7;
        padding-bottom: 10rpx;
    }
</style>

