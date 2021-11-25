import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    dialog: false,
    product: {},
    urlAPI: 'http://localhost:52162/api'
  },
  getters: {
    GetProducts(state) {
      return state.products
    },
    GetProduct(state) {
      return state.product
    }
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload
    },
    SET_PRODUCT(state, payload) {
      state.product = payload
    }
  },
  actions: {
    GetProductosAsync({ commit, state }) {
      return axios
        .get(`${state.urlAPI}/Articulos`)
        .then((data) => {
          commit('SET_PRODUCTS', data.data)
        })
        .catch((error) => {
          console.log({ error })
          return { error }
        })
    },
    GuardarCambios({ state }, payload) {
      return axios
        .post(`${state.urlAPI}/Articulos`, payload)
        .then((data) => {
          return data.data
        })
        .catch((error) => {
          console.log({ error })
          return { error }
        })
    },
    SetProduct({ commit }, payload) {
      commit('SET_PRODUCT', payload)
    },
    DeleteProduct({ state, commit }, articuloId) {
      return axios
        .delete(`${state.urlAPI}/Articulos/${articuloId}`)
        .then(() => {
          const newArray = []
          state.products.forEach((item) => {
            if (articuloId !== item.articuloId) {
              newArray.push(item)
            }
          })
          commit('SET_PRODUCTS', newArray)
        })
        .catch((error) => {
          console.log({ error })
          return { error }
        })
    }
  }
})
