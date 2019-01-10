<template>
    <div class="header">
        <i v-if="showback" @click="back" class="cubeic-back"></i>
        <h1>{{title}}</h1>
        <div class="extend">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title:{
            type:String,
            default: '',
            required: true
        },
        showback:{
            type:Boolean,
            default:false
        }
    },
    methods: {
        back() {
            this.$router.back()
        }
    },
}
</script>

<style lang="stylus">
.header
  position fixed
  top 0
  left 0
  right 0
  z-index 3
  height 44px
  line-height 44px
  text-align center
  background #edf0f4
  .cubeic-back
    position absolute
    top 0
    left 0
    padding 0 15px
    color #fc915b
  .extend
    position absolute
    top 0
    right 0
    padding 0 15px
    color #fc915b 
</style>
