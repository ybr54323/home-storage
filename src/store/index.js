import Vue from 'vue';
import Vuex from 'vuex';
import {getFriend} from "@/sevice/friend";
import {getGroup} from "@/sevice/userGroup";
import {getChatMessage, getFriendMessage, getGroupMessage} from "@/sevice/message";
import {getUserGood} from "@/sevice/good";

Vue.use(Vuex);

const unreadCount = (messages) => {
  let count = 0
  messages.forEach(message => {
    message.target_user_is_read === 0 && count++
  })
  return count
}

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
      groupUnread: 0,
      notice: ''
    },
    appStatus: {
      showTarBar: true
    }
  },
  actions: {
    getFriend({state, commit}) {
      getFriend()
        .then(res => {
          const {data: {friend}} = res
          commit('setFriend', friend)
        })
    },
    getGroup({state, commit}) {
      getGroup()
        .then(res => {
          const {data: {group}} = res
          commit('setGroup', group)
        })
    },
    getChatMessage({state, commit}) {
      getChatMessage()
        .then(res => {
          const {data: {chatMessage}} = res
          commit('setFriendMessage', chatMessage)
          commit('setFriendUnread', unreadCount(chatMessage))
        })
    },
    getFriendMessage({state, commit}) {
      getFriendMessage()
        .then(res => {
          const {data: {friendMessage}} = res
          commit('setFriendMessage', friendMessage)
          commit('setFriendUnread', unreadCount(friendMessage))
        })
    },
    getGroupMessage({state, commit}) {
      getGroupMessage()
        .then(res => {
          const {data: {groupMessage}} = res
          commit('setGroupMessage', groupMessage)
          commit('setGroupUnread', unreadCount(groupMessage))
        })
    },
    getUserGood({state, commit}) {
      getUserGood()
        .then(res => {
          const {data: {good}} = res
          commit('setUserGood', good)
        })
    }
  },
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
    setUserGood(state, good) {
      state.userInfo.good = good
    },
    setSocketId(state, socketId) {
      state.userInfo.socketId = socketId
    },
    setShowTarBar(state, status) {
      state.appStatus.showTarBar = !!status
    },
    setNotice(state, notice) {
      state.userInfo.notice = notice
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

    userGood(state) {
      return state.userInfo.good
    },
    socketId(state) {
      return state.userInfo.socketId
    },
    appStatus(state) {
      return state.appStatus
    },
    notice(state) {
      return state.userInfo.notice
    }
  }
});
