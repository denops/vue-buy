import Notice from './Notice.vue'
import Vue from 'vue'

// 手动创建Alert组件，加载到body里，不受付组件影响

Notice.newKaikeba = props=>{
  const Instance = new Vue({
    data(){
      return props || {}
    },
    render(h){
      // <Notive a="1" b="2">
      // h就是类似react李的createElement
      return h(Notice,{
        props
      })
    }
  })
  const comp = Instance.$mount() //渲染
  console.log(comp)
  // 挂载在body之上 而不是组w件内部
  document.body.appendChild(comp.$el)
  // notive还是vue的实例 并不是dom
  const notice = Instance.$children[0]

  // notice的实例
  return {
    add(optipns){
      notice.add(optipns)
    },
    del(id){
      notice.del(id)
    }
  }
}
export default Notice