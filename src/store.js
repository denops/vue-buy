import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    token: '',
    cart: JSON.parse(localStorage.getItem('cart')) || []
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    addcart(state, item) {
      const good = state.cart.find(v => v.title === item.title)
      if (good) {
        good.cartCount += 1
      } else {
        state.cart.push({ ...item, cartCount: 1 })
      }
    },
    cartremove(state, index) {
      if (state.cart[index].cartCount > 1) {
        state.cart[index].cartCount -= 1
      }
    },
    cartadd(state, index) {
      state.cart[index].cartCount += 1
    }
  },
  getters: {
    cartTotal: state => {
      let num = 0
      state.cart.forEach(element => {
        num += element.cartCount
      })
      return num
    },
    total: state => {
      let num = 0
      state.cart.forEach(element => {
        num += element.cartCount * element.price
      })
      return num
    }
  },
  actions: {

  }
})

store.subscribe((mutations, state) => {
  localStorage.setItem('cart', JSON.stringify(state.cart))
})

export default store
