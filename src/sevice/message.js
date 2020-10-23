import http from "./http";

/**
 * message
 * type: 1.聊天消息 2.好友申请 3.群组邀请
 * answer: 0.待处理 1.允许 2.拒绝
 * source_user_id 消息发起人id
 * target_user_id 消息接收人id
 * source_user_is_read
 * source_user_is_delete
 */

// 创建消息
export function createChatMessage({target_user_id, content}) {
  return http({
    url: '/message/chat',
    method: 'post',
    data: {
      target_user_id,
      content
    }
  })
}

export function createFriendMessage({target_user_id}) {
  return http({
    url: '/message/friend',
    method: 'post',
    data: {
      target_user_id
    }
  })
}

export function createGroupMessage({target_user_id, group_id}) {
  return http({
    url: '/message/group',
    method: 'post',
    data: {
      target_user_id,
      group_id
    }
  })
}


// 获取所有消息
export function getAllMessage() {
  return http({
    url: '/message',
    method: 'get'
  })
}


// 获取聊天信息
export function getChatMessage() {
  return http({
    url: '/message/chat',
    method: 'get',
  })
}

// 获取好友邀请消息
export function getFriendMessage() {
  return http({
    url: '/message/friend',
    method: 'get',
  })
}

// 获取群组邀请信息
export function getGroupMessage() {
  return http({
    url: '/message/group',
    method: 'get',
  })
}

// 查看消息
// 查看聊天消息(已读)
export function viewChatMessage() {
  return http({
    url: '/message/chat/view',
    method: 'post',
  })
}

// 查看好友申请消息(已读)
export function viewFriendMessage() {
  return http({
    url: '/message/friend/view',
    method: 'post',
  })
}

// 查看群组申请消息(已读)
export function viewGroupMessage() {
  return http({
    url: '/message/group/view',
    method: 'post',
  })
}

// 处理消息
// 处理好友申请消息
export function handleFriendMessage({message_id, source_user_id, answer}) {
  return http({
    url: '/message/friend/handle',
    method: 'post',
    data: {
      message_id,
      answer,
      source_user_id
    }
  })
}

// 处理群组申请消息
export function handleGroupMessage({message_id, group_id, source_user_id, answer}) {
  return http({
    url: '/message/group/handle',
    method: 'post',
    data: {
      group_id,
      message_id,
      answer,
      source_user_id
    }
  })
}
