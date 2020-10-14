<template>
  <div>
    <van-nav-bar
        v-if="step!==0"
        :title="title"
        :left-text="leftText"
        left-arrow
        @click-left="onBack"
    />
    <div class="con">
      <div class="step0" v-if="step===0">
        <van-button class="btn" @click="step = 1" type="primary" block>手机号码验证码登录</van-button>
        <van-button class="btn" @click="step = 3" type="primary" block>账号密码登录</van-button>
      </div>
      <div class="step1" v-if="step===1">
        {{codeForm}}
        <van-form ref="codeForm">
          <van-field
              v-model="codeForm.phone"
              type="tel"
              clearablel
              label="手机号"
              placeholder="请输入手机号"
              :rules="[{ required: true, message: '请输入手机号', trigger: 'blur', validator: num }]"
          />
          <van-field
              v-model="codeForm.code"
              type="digit"
              clearable
              center
              label="短信验证码"
              placeholder="请输入短信验证码"
              :rules="[{ required: true, message: '请输入短信验证码', trigger: 'blur',validator: num }]"
          >
            <template #button>
              <van-button :disabled="codeForm.wait" size="small" type="primary" @click="onSendZhenziCode">
                {{codeForm.wait ? codeForm.waitSec + 's' : '发送验证码'}}
              </van-button>
            </template>
          </van-field>
          <van-button round block type="info" @click="onCodeFormSubmit">
            登录 / 注册
          </van-button>
        </van-form>
      </div>
      <div class="step2" v-if="step===2">
        {{registerForm}}
        <van-form ref="registerForm">
          <van-field
              v-model="registerForm.username"
              type="text"
              name="username"
              clearablel
              label="用户名"
              placeholder="请输入用户名"
              :rules="[{ required: true, message: '用户名不能为空', trigger: 'blur', validator: notEmpty }]"
          />
          <van-field name="switch" label="是否启用密码">
            <template #input>
              <van-switch v-model="registerForm.usePwd" size="20"/>
            </template>
          </van-field>
          <van-field
              v-if="registerForm.usePwd"
              v-model="registerForm.pwd"
              :type="registerForm.viewPwd ? 'text':'password'"
              clearable
              label="密码"
              placeholder="请输入密码"
              :rules="[{ required: true, message: '密码不能为空', trigger: 'blur',validator: notEmpty }]"
          >
            <template #button>
              <van-icon name="eye-o" color="#07c160" @click="registerForm.viewPwd = !registerForm.viewPwd">
              </van-icon>
            </template>
          </van-field>
          <van-button round block type="info" @click="onRegisterFormSubmit">
            注册新用户
          </van-button>
        </van-form>
      </div>
      <div class="step3" v-if="step===3">
        {{loginForm}}
        <van-form ref="loginForm">
          <van-field
              v-model="loginForm.account"
              type="text"
              name="account"
              clearablel
              label="手机号 / 用户名"
              placeholder="请输入手机号码 / 用户名"
              :rules="[{ required: true, message: '手机号码 / 用户名不能为空', trigger: 'blur', validator: notEmpty }]"
          />
          <van-field
              v-model="loginForm.pwd"
              :type="loginForm.viewPwd ? 'text':'password'"
              clearable
              label="密码"
              placeholder="请输入密码"
              :rules="[{ required: true, message: '密码不能为空', trigger: 'blur',validator: notEmpty }]"
          >
            <template #button>
              <van-icon name="eye-o" color="#07c160" @click="loginForm.viewPwd = !loginForm.viewPwd">
              </van-icon>
            </template>
          </van-field>
          <van-button round block type="info" @click="onLoginFormSubmit">
            登录
          </van-button>
        </van-form>
      </div>

    </div>

  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {getZhenziCode} from '@/sevice/api'

export default {
  name: "Login",
  data() {
    /**
     *
     * @type {Map<number, {leftText: string, title: string}>}
     * key: 1: 发送验证码 code 2: 新用户 3: 账号密码登录
     */
    const operationMap = new Map([
      [
        1, {title: '发送验证码', leftText: '返回登录页'}
      ],
      [
        2, {title: '注册新用户', leftText: '返回发送验证码页'}
      ],
      [
        3, {title: '账号密码登录', leftText: '返回登录页'}
      ]
    ])
    return {
      step: 0, // 0: 初始状态 1: 发送验证码 code 2: 新用户 3: 账号密码登录
      codeForm: { // 验证码表单
        phone: '',
        code: '',
        waitSec: 0,
        wait: false,
      },
      registerForm: {
        username: '',
        pwd: '',
        usePwd: false,
        viewPwd: false
      },
      loginForm: {
        account: '',
        pwd: '',
        viewPwd: false
      },
      operationMap
    }
  },
  computed: {
    ...mapGetters(['appStatus']),
    title() {
      const {step, operationMap: op} = this
      if (!step) return
      return op.get(step).title
    },
    leftText() {
      const {step, operationMap: op} = this
      if (!step) return
      return op.get(step).leftText
    }
  },
  created() {
    this.setShowTarBar(false)
  },
  methods: {
    ...mapMutations({
      setShowTarBar: 'setShowTarBar'
    }),
    onCodeFormSubmit() {
      this.$refs.codeForm.validate()
          .then(() => {

          })
          .catch()
    },
    onRegisterFormSubmit() {
      const {registerForm: r} = this
      if (r.usePwd) {
        this.$refs.registerForm.validate()
            .then()
            .catch()
      } else {
        this.$refs.registerForm.validate('username')
            .then()
            .catch()
      }
    },
    onLoginFormSubmit() {
      const {loginForm: l} = this
      if (l.usePwd) {
        this.$refs.loginForm.validate()
            .then()
            .catch()
      } else {
        this.$refs.loginForm.validate('account')
            .then()
            .catch()
      }

    },
    num(val) {
      return /\d+/.test(val)
    },
    notEmpty(val) {
      return !!val
    },
    onSendZhenziCode() {
      const {codeForm: c} = this
      if (!c.phone) return
      if (c.waitSec && c.wait) return
      if (c.wait) return
      if (!c.waitSec && !c.wait) {
        getZhenziCode(c.phone)
        c.waitSec = 60
        c.wait = true
        window.intervalId = setInterval(() => {
          c.waitSec--
          if (c.waitSec === 0) {
            c.wait = false
            clearInterval(window.intervalId)
          }
        }, 1000)
      }
    },
    onBack() {
      if (this.step > 0 && this.step !== 3) {
        this.step--
        return
      }
      this.step = 0
    }
  }
}
</script>

<style scoped>

</style>
