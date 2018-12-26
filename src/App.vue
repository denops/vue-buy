<template>
  <div>
    <p v-if="showName">{{name}}</p>
    <ul>
      <li v-for="(good,index) in goods" :key="index">
        <span>{{good.text}}</span>
        <span>￥{{good.price}}</span>
        <button @click="addCart(index)">添加到购物车</button>
      </li>
    </ul>
    <Cart :name="name"></Cart>
  </div>
</template>

<script>
import axios from 'axios'
import Cart from './components/Cart'
export default {
  name: 'app',
  components:{Cart},
  data() {
    return {
      name: '开课吧课程学吧',
      showName: true,
      goods:[],
      text:''
    }
  },
 async created() {
    const res = await axios.get('/api/goods')
    this.goods = res.data.list
    console.log(this.goods)
  },
  methods: {
    addCart(i){
      const good = this.goods[i];
      this.$bus.$emit('addCart',good)
    },
    // addCart(i){
    //   const good = this.goods[i];
    //   const isGood = this.cart.find(v => v.text === good.text);
    //   if (isGood) {
    //     this.cart.count +=1;
    //   } else {
    //     this.cart.push({
    //       ...good,
    //       active:true,
    //       count:1
    //     })
    //   }
    // },
    addGood(){
      if(this.text !== ""){
        this.goods.push({text: this.text})
        this.text = '';
      }
    }
  },
}
</script>

<style scoped>
  #app{
    color: blueviolet;
  }
</style>

