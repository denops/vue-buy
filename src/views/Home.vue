<template>
  <div class="home">

    <k-header title="开课吧">
      <i class="cubeic-tag" @click='showCatg'></i>
    </k-header>
    <cube-slide
      :data="slider"
      :threshold="0.7"
      :interval="10000"
    >
      <cube-slide-item v-for="(item,index) in slider" :key="index">
        <router-link :to="`/detail/${item.id}`">
          <img class='slider' :src="item.img" alt="">
        </router-link>

      </cube-slide-item>
    </cube-slide>
    <!-- <cube-button >选择分类</cube-button> -->
    <goods-list @addcart="onAddcart" :data="all"></goods-list>


      <!-- :visible="showDrawer" -->

    <cube-drawer
      ref='drawer'
      title='请选择分类'
      :data="[drawList]"
      @select="selectHandler"
    >

    </cube-drawer>
    <div class="ball-wrap">
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @afterEnter="afterEnter"
      >
        <div class="ball" v-show="ball.show">
          <div class="inner">
            <div class="cubeic-add"></div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import GoodsList from '@/components/GoodsList.vue'
import KHeader from '@/components/KHeader.vue'
// @ is an alias to /src

let labels = {
  'fe':'前端',
  'python':'Python',
  'java':'Java',
  'bigdata':'大数据',
  'ai':'人工智能'
}
export default {
  name: 'home',
  components:{
    GoodsList,
    KHeader
  },
  data(){
    return {
      slider:[],
      selectKeys:[],
      keys:[],
      data:[],
      ball:{
        show:false,
        el:null // 目标dom
      }
    }
  },
  methods:{
    showCatg(){
        this.$refs.drawer.show()
    },
    selectHandler(val){
      this.selectKeys = [...val]
    },
    onAddcart(el){
      this.ball.show = true
      // 获取点击的元素
      this.ball.el = el
    },
    beforeEnter(el){
      // 小球移动到点击的位置
      // 1. 获取点击的dom
      const dom = this.ball.el
      const rect = dom.getBoundingClientRect()
      console.log(rect.top,rect.left)
      // 小球移动到点击的位置
      const x = rect.left-window.innerWidth/2
      const y = -(window.innerHeight-rect.top-10-20)
      el.style.display = ''
      el.style.transform = `translate3d(0, ${y}px, 0)`
      const inner = el.querySelector('.inner')
      inner.style.transform = `translate3d(${x}px,0,0)`
    },
    enter(el, done){
      this._reflow = document.body.offsetHeight
      // 动画开始，移动到初始位置
      // 小球移动到购物车位置
      el.style.transform = `translate3d(0, 0, 0)`
      const inner = el.querySelector('.inner')
      inner.style.transform = `translate3d(0,0,0)`
      el.addEventListener("transitionend",done)

    },
    afterEnter(el){
      // 结束 隐藏小球
      this.ball.show = false
      el.style.display = 'none'
    }
  },
  async created(){
    const ret = await this.$axios.get('/api/goods')
    this.slider = ret.slider
    this.keys = ret.keys
    this.selectKeys = [...this.keys]
    this.data = ret.data
  },
  computed:{
    drawList(){
      return this.keys.map(v=>{
        return {
          value:v,
          text: labels[v]
        }
      })
    },
    all(){
      let ret = []
      this.selectKeys.forEach(v=>{
        ret = ret.concat(this.data[v])
      })
      return ret
    }
    // alias
  }
}
</script>

<style lang="stylus">
img.slider
  width 100%
.ball-wrap
  .ball
    position fixed
    left 50%
    bottom 10px
    z-index 200
    color red
    transition all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41)
    .inner
      width 16px
      height 16px
      
      transition all 0.5s linear
.cubeic-add
  font-size 22px
      
</style>

