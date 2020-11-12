<template>
  <div
      v-show="isShow"
      :class="{'process-bar': 1, 'done': done}"
      :style="{
        height: _height
      }"
  >
  </div>
</template>

<script>
export default {
  name: "processBar",
  props: {
    // 是否显示
    isShow: {
      type: Boolean,
      default() {
        return false
      }
    },
    // 宽度
    height: {
      type: Number || String,
      default() {
        return 20
      }
    },
    // 走完流程
    done: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  computed: {
    _height() {
      if (/\d+px$/i.test(this.height)) {
        return this.height
      } else if (/^\d$/.test(this.height)) {
        return this.height + 'px'
      } else {
        return '20px'
      }
    }
  }
}
</script>

<style scoped>
.process-bar {
  width: 100vw;
  position: fixed;
  border-radius: 10px;
  background-image: linear-gradient(to right, rgb(16, 142, 233), rgb(135, 208, 104));
  transform: translateX(-5vw);
  animation: processing 4s cubic-bezier(.08, .82, .17, 1) 0s;
}

.process-bar::before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  content: '';
  background-color: #fff;
  opacity: 0;
  border-radius: 10px;
  animation: progress-active 1s cubic-bezier(.23, 1, .32, 1) infinite;
}


.process-bar.done {
  transition: done .2s linear;
}

@keyframes processing {
  0% {
    transform: translateX(-100vw);
  }
  100% {
    transform: translateX(-5vw);
  }
}

@keyframes done {
  0% {
    transform: translateX(-5vw);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes progress-active {
  0% {
    right: 95%;
    opacity: 0;
  }
  100% {
    right: 0;
    opacity: .2;
  }
}
</style>
