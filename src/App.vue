<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link> |
      <span v-if="isLogin" @click="logout">Logout</span>
    </div> -->
    <cube-tab-bar v-model="selectLabel" :data="tabs" @change="changeHandler" show-slider>
      <cube-tab v-for="(item,index) in tabs" :key="index" :icon="item.icon" :label="item.value">
        <span>{{item.label}}</span>
        <span class="badge" v-if="item.label=='Cart'">{{cartTotal}}</span>
      </cube-tab>
    </cube-tab-bar>
      <router-view/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      selectLabel:'/',
      tabs:[
        {label: 'Home', value:'/', icon:'cubeic-home'},
        {label: 'Cart', value:'/cart', icon:'cubeic-mall'},
        {label: 'Me', value:'/login', icon:'cubeic-person'},
      ]
    }
  },
  computed: {
    ...mapGetters({
      cartTotal: 'cartTotal'
    }),
    isLogin() {
      return !!this.$store.state.token
    }
  },
  methods: {
    changeHandler(val) {
      this.$router.push(val)
    },
    logout() {
      this.$axios.get('/api/logout')
    }
  },
 async created() {
    const token = localStorage.getItem('token')
    if (token) {
      this.$store.commit('setToken',token)
    }
    const ret = await this.$axios.get('/api/goods') 
  },
}
</script>


<style lang="stylus" scope>

.badge
  display inline-block
  background #de3529
  color white
  padding 5px
  border-radius 50%
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 46px
  padding-bottom 46px
#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983

.route-move-enter, .route-move-leave-active 
  transform :translate(100%, 0)
.route-move.enter-active, .route-move-leave-active
  transition : transform 0.3s
.cube-tab-bar
  background-color #ffffff
  position fixed
  bottom 0
  left 0
  right 0
</style>
