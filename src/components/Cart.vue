<template>
    <div>
        {{name}}购物车
        <hr>
        <table border="1">
            <tr>
                <th></th>
                <th>课程名称</th>
                <th>单价</th>
                <th>数量</th>
                <th>总价格</th>
            </tr>
             <tr v-for="(c,i) in cart" :key="c.text" :class="{active:c.active}">
                <td>
                    <input type="checkbox" v-model="c.active">
                </td>
                 <td>{{c.text}}</td>
                <td>{{c.price}}</td>
                <td><button @click="min(i)">-</button> {{c.count}} <button @click="add(i)">+</button></td>
                <td>{{c.price * c.count}}</td>
            </tr>
            <tr>
                <td colspan='3'>{{activeCount}}/{{count}} </td>
                <td colspan='2'>{{total}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: {name:{
        type:String,
        required:true
    }},
    data() {
        return {
            cart:[]
        }
    },
    created() {
        this.cart = JSON.parse(window.localStorage.getItem("cart")) || [];
        //监听emit触发后的事件
        this.$bus.$on('addCart', good => {
            const ret = this.cart.find(v => v.text == good.text);
            if (ret) {
               ret.count +=1;
            } else {
                this.cart.push({
                ...good,
                active:true,
                count:1
                })
            }
        })
    },
    watch: {
        //深度监听
        cart:{
            handler(){
                this.setLocal();
            },
            deep:true
        }
    },
    computed:{
        count(){
            return this.cart.length
        },
        activeCount(){
            return this.cart.filter(v => v.active).length
        },
        total(){
            return this.cart.reduce((sum,v)=>{
                if(v.active){
                    return sum+v.price*v.count
                }
                return sum
            },0)
        }
    },
    methods: {
        setLocal(){
            window.localStorage.setItem('cart', JSON.stringify(this.cart));
        },
         add(i){
            this.cart[i].count +=1;
        },
        min(i){
            let count = this.cart[i].count;
            if (count > 1) {
                this.cart[i].count -=1;
            } else {
                this.remove(i);
            }
        },
        remove(i){
            if(window.confirm('是否删除该课程'+this.cart[i].text+'?')){
                this.cart.splice(i,1)
            }
        }
    },
   
}
</script>

<style scoped>
table tr.active{color: red;font-weight: bold}
</style>

