import http from "./http";

/**
 *
 * @param type 1.聊天消息 2.好友申请 3.群组邀请
 * @param target_user_id
 * @returns {AxiosPromise}
 */
export function message({type, target_user_id}) {
  return http({
    url: '/message/',
    method: 'post',
    data: {
      type,
      target_user_id
    }
  })
}

