<template>
  <div class="alert">
    <div class="alert-container" v-for='item in alerts' :key="item.id">
      <div class="alert-content">
          {{item.content}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      alerts:[]
    }
  },
  created(){
    this.id = 0
  },
  methods:{
    add(option){
      // 新增消息
      const id = 'id_'+(this.id++)
      const _alert = {...option, id:id}
      this.alerts.push(_alert)
      // 延迟关闭
      const duration = option.duration
      setTimeout(()=>{
        this.del(id)
      },duration*1000)
    },
    del(id){
      // 删除消息
      for(let i=0;i<this.alerts.length;i++){
        if(this.alerts[i].id==id){
          this.alerts.splice(i,1)
          break
        }
      }
    }
  }
}
</script>

<style lang="stylus">
.alert
  position fixed
  width 100%
  top 30px
  left 0
  text-align center
  .alert-content
    display inline-block
    padding 8px
    background #fff
    margin-bottom 10px
</style>
