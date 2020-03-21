import AuthRepository from "../../repository/AuthRepository"
import Router from "../../router"

// state
const state = {
  token: localStorage.getItem("token"),
  token_update_date: new Date(localStorage.getItem("token_update_date")),
  tokenExpirado: false,
  permissoes: null
}

// actions
const actions = {
  async login({ commit }, authData) {
    return await AuthRepository.login(authData)
      .then(res => {
        const date = new Date()
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("token_update_date", date)
        localStorage.setItem("nome", res.data.username)

        commit("AUTHENTICATE", { token: res.data.token, date })

        Router.push("/projects")
      })
      .catch(err => console.log(err))
  },

  async register({ commit }, authData) {
    return await AuthRepository.register(authData)
      .then(res => {
        const date = new Date()
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("token_update_date", date)
        localStorage.setItem("nome", res.data.username)

        commit("AUTHENTICATE", { token: res.data.token, date })
      })
      .catch(err => console.log(err))
  },

  updateToken({ commit }, tokenData) {
    const date = new Date()
    localStorage.setItem("token", tokenData.token)
    localStorage.setItem("token_update_date", date)
    commit("UPDATE_AUTH_DATA", { token: tokenData.token, date })
  },

  removeToken({ commit }) {
    localStorage.removeItem("token")
    localStorage.removeItem("token_update_date")
    commit("CLEAR_AUTH_DATA")
  }
}

// getters
const getters = {
  isAuthenticated(state) {
    return state.token !== null
  },

  token(state) {
    return state.token
  },

  isValidDateToken(state) {
    const MINUTOS_VALIDADE_TOKEN = 60
    const minutos = parseInt((new Date() - state.token_update_date) / 1000 / 60)
    return minutos < MINUTOS_VALIDADE_TOKEN
  }
}

// mutations
const mutations = {
  AUTHENTICATE: (state, authUser) => {
    state.token = authUser.token
    state.token_update_date = authUser.date
  },
  CLEAR_AUTH_DATA: state => {
    state.token = null
    state.token_update_date = null
  },
  UPDATE_AUTH_DATA: (state, tokenData) => {
    state.token = tokenData.token
    state.token_update_date = tokenData.date
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}