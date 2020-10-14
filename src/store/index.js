import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      id: '',
      name: '',
      avatar: '',
      group: [],
      friend: [],
      good: [],
      message: [],
      socketId: '',
    },
    appStatus: {
      showTarBar: true
    }
  },
  actions: {},
  mutations: {
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    setGroup(state, group) {
      state.userInfo.group = group
    },
    setFriend(state, friend) {
      state.userInfo.friend = friend
    },
    setMessage(state, message) {
      state.userInfo.message = message
    },
    setGood(state, good) {
      state.userInfo.good = good
    },
    setSocketId(state, socketId) {
      state.userInfo.socketId = socketId
    },
    setShowTarBar(state, status) {
      state.appStatus.showTarBar = !!status
    }
  },
  getters: {
    userInfo(state) {
      return state.userInfo
    },
    group(state) {
      return state.userInfo.group
    },
    friend(state) {
      return state.userInfo.friend
    },
    message(state) {
      return state.userInfo.message
    },
    good(state) {
      return state.userInfo.good
    },
    socketId(state) {
      return state.userInfo.socketId
    },
    appStatus(state) {
      return state.appStatus
    }
  }
});
