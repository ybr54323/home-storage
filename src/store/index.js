import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {
      id: '',
      name: '',
      avatarUrl: '',
      group: [],
      friend: [],
      good: [],
      chatMessage: [],
      friendMessage: [],
      groupMessage: [],
      chatUnread: 0,
      friendUnread: 0,
      groupUnread: 0
    },
    appStatus: {
      showTarBar: true
    }
  },
  actions: {},
  mutations: {
    setUserInfo(state, {id, name, avatar_url = ''}) {
      state.userInfo.id = id
      state.userInfo.name = name
      state.userInfo.avatarUrl = avatar_url
    },
    setGroup(state, group) {
      state.userInfo.group = group
    },
    setFriend(state, friend) {
      state.userInfo.friend = friend
    },
    // 信息
    setChatMessage(state, cM) {
      state.userInfo.chatMessage = cM
    },
    setFriendMessage(state, fM) {
      state.userInfo.friendMessage = fM
    },
    setGroupMessage(state, gM) {
      state.userInfo.groupMessage = gM
    },
    // 未读信息量
    setChatUnread(state, num) {
      state.userInfo.chatUnread = num
    },
    setFriendUnread(state, num) {
      state.userInfo.friendUnread = num
    },
    setGroupUnread(state, num) {
      state.userInfo.groupUnread = num
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
    // 信息
    chatMessage(state) {
      return state.userInfo.chatMessage
    },
    friendMessage(state) {
      return state.userInfo.friendMessage
    },
    groupMessage(state) {
      return state.userInfo.groupMessage
    },
    // 未读信息量
    chatUnread(state) {
      return state.userInfo.chatUnread
    },
    friendUnread(state) {
      return state.userInfo.friendUnread
    },
    groupUnread(state) {
      return state.userInfo.groupUnread
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
