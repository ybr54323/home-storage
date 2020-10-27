<template>
  <div class="chat-room-con">
    <slot name="nav-bar"></slot>
    <slot name="notice"></slot>
    <div class="con">
      <div class="chat-row-mine">
        <div class="chat-area-mine">
          <div class="text-bar">
            test
          </div>
          <div class="chat-bubble-mine">
            test
          </div>
        </div>
        <van-image
            class="img-avatar"
            lazy-load
            width="50"
            height="50"
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20"/>
          </template>
        </van-image>
      </div>
      <div class="chat-row-other">
        <van-image
            class="img-avatar"
            lazy-load
            width="50"
            height="50"
            fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
        >
          <template v-slot:loading>
            <van-loading type="spinner" size="20"/>
          </template>
        </van-image>
        <div class="chat-area-other">
          <div class="text-bar">
            test
          </div>
          <div class="chat-bubble-other">
          </div>
        </div>
      </div>
    </div>
    <div class="send-con">
      <van-cell-group>
        <van-field center v-model="value" placeholder="请输入用户名">
          <template #button>
            <van-button size="small" type="primary">发送</van-button>
          </template>

        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    chatMessage: {
      type: Array,
      default() {
        return []
      }
    }
  },
  name: "chatRoom",
  data() {
    return {
      value: ''
    }
  }
}
</script>

<style scoped>
.chat-room-con {
  position: relative;
}


.msg-con {
  padding-bottom: 80px;
}

.chat-row-mine {
  display: flex;
  justify-content: flex-end;

}

.chat-row-other {
  display: flex;
  justify-content: flex-start;
}


/*头像 + 顶栏 + 气泡con*/
.chat-area-mine {
  display: inline-block;
  margin: 0 10px;
  border-radius: 5px;
}

.chat-area-other {
  display: inline-block;
  margin: 0 10px;
  border-radius: 5px;
}

/*头像*/
.img-avatar {
  box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22)
}

/*气泡上面那行字*/
.text-bar {
  margin: 0 0 5px 0;
}

/*气泡*/
.chat-bubble-mine {
  background-color: lawngreen;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22)
}

.chat-bubble-other {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22)
}

/*发送栏*/
.send-con {
  width: 100%;
  position: fixed;
  height: 50px;
  bottom: 0;
  display: flex;
  justify-content: center;
}

</style>
