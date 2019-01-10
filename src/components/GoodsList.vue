<template>
    <div class="goodlist">
        <div class="item" v-for="item in data" :key="item.id">
            <router-link :to="`/detail/${item.id}`">
                <div class="left">
                    <img :src="item.img" @click.stop.prevent="imgPreView(item.img)" alt="">
                </div>
                <div class="right">
                    <div class="title">{{item.title}}</div>
                    <div class="info">
                        <span>{{item.count}}人购买</span>
                        <i class="cubeic-add" @click.stop.prevent="addCart($event, item)"></i>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props: ['data'],
    methods: {
        imgPreView(imgsrc) {
            this.$createImagePreview({
                imgs:[imgsrc]
            }).show()
        },
        addCart(event, item) {
            this.$store.commit('addcart',item)
            this.$emit('addcart',event.target)
            console.log(event.target)
        }
    },
}
</script>

<style lang="stylus">
.item
  padding 10px
  overflow hidden
  border-bottom 1px solid #ddd
  .left
    width 100px
    float left
    img 
      width 100%
  .right
    margin-left 120px
    text-align  right
    .title
      line-height 30px
      text-align left 
    .cubeic-add
      font-size 22px
    
</style>

