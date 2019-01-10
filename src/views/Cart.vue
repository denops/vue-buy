<template>
    <div>
        
        <div class="good" v-for="(item,index) in cart" :key="index">
            {{item.title}}
            <div class="right">
                <i class="cubeic-remove" @click="removeCart(index)"></i>
                <span>{{item.cartCount}}</span>
                <i class="cubeic-add" @click="addCart(index)"></i>
            </div>
        </div>
        <div>总价：{{total}}</div>
        <cube-button :disabled="true" v-if="total<minTotal">还差{{minTotal-total}}可以购买</cube-button>
        <span v-if="!token">(需要登录方可购买)</span>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import KHeader from '@/components/KHeader.vue'
export default {
    components:{
        KHeader
    },
    data() {
        return {
            minTotal:1000
        }
    },
    computed: {
        ...mapState({
            cart: state=>state.cart,
            token: state=>state.token
        }),
        ...mapGetters({
            total: 'total'
        })
    },
    methods: {
        removeCart(index) {
            this.$store.commit('cartremove',index)
        },
        addCart(index) {
            this.$store.commit('cartadd',index)
        }
    },
}
</script>

<style lang="stylus">
.good
  padding 10px
  text-align left
  .right
    float right
  i 
    font-size 18px
</style>
