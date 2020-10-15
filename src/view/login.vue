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
              <van-button :disabled="codeForm.wait" size="small" type="primary" @click="onSendCode">
                {{codeForm.wait ? codeForm.waitSec + 's' : '发送验证码'}}
              </van-button>
            </template>
          </van-field>
          <van-button round block type="info" @click="onSubmit">
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
          <van-button round block type="info" @click="onSubmit">
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
          <van-button round block type="info" @click="onSubmit">
            登录
          </van-button>
        </van-form>
      </div>
      <div class="step4" v-if="step===4">
        {{forgetForm}}
        <van-form ref="forgetForm">
          <van-field
              v-model="forgetForm.phone"
              type="tel"
              clearablel
              label="手机号"
              placeholder="请输入手机号"
              :rules="[{ required: true, message: '请输入手机号', trigger: 'blur', validator: num }]"
          />
          <van-field
              v-model="forgetForm.code"
              type="digit"
              clearable
              center
              label="短信验证码"
              placeholder="请输入短信验证码"
              :rules="[{ required: true, message: '请输入短信验证码', trigger: 'blur',validator: num }]"
          >
            <template #button>
              <van-button :disabled="forgetForm.wait" size="small" type="primary" @click="onSendCode">
                {{forgetForm.wait ? forgetForm.waitSec + 's' : '发送验证码'}}
              </van-button>
            </template>
          </van-field>
          <van-field
              v-model="forgetForm.pwd"
              :type="forgetForm.viewPwd ? 'text':'password'"
              clearable
              label="密码"
              placeholder="请输入密码"
              :rules="[{ required: true, message: '密码不能为空', trigger: 'blur',validator: notEmpty }]"
          >
            <template #button>
              <van-icon name="eye-o" color="#07c160" @click="forgetForm.viewPwd = !forgetForm.viewPwd">
              </van-icon>
            </template>
          </van-field>
          <van-button round block type="info" @click="onSubmit">
            下一步
          </van-button>
        </van-form>
      </div>

    </div>

  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import {getZhenziCode, login, register, forgetPwd} from '@/sevice/api'

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
      step: 0, // 0: 初始状态 1: 发送登录/注册验证码 2: 新用户 3: 账号密码登录 4.发送忘记密码验证码
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
      forgetForm: {
        phone: '',
        code: '',
        waitSec: 0,
        wait: false,
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
    onSubmit() {
      // 0: 初始状态 1: 发送登录/注册验证码 2: 新用户 3: 账号密码登录 4.发送忘记密码验证码
      const {step, codeForm, registerForm, loginForm, forgetForm, $refs: ref} = this
      const form =
          step === 1 ? codeForm :
              step === 2 ? registerForm :
                  step === 3 ? loginForm :
                      step === 4 ? forgetForm : null
      const v =
          step === 1 ? () => ref[form].validate() :
              step === 2 ? () => ref[form].validate(form.usePwd ? 'username' : undefined) :
                  step === 3 ? () => ref[form].validate(form.usePwd ? 'account' : undefined) :
                      step === 4 ? () => ref[form].validate() : null
      const api =
          step === 1 ? getZhenziCode :
              step === 2 ? register :
                  step === 3 ? login :
                      step === 4 ? forgetPwd : null
      v()
          .then(() => {
            api(form)
                .then(res => {
                  const {code, data, msg} = res
                  if (code === 200) {
                    if (step === 1) {
                      const {userInfo: {isNewUser}} = data
                      if (isNewUser) { // go register new user with a username
                        this.step = 2
                        return
                      }
                      // cache user info
                      this.$router.push('Index')
                    } else if ([2, 3, 4].indexOf(step) >= 0) { // register / login / reLogin success
                      const {userInfo} = data
                      // cache user info
                      this.$router.push('Index')
                    }
                  }
                })
          })
          .catch(err => {
            console.warn(err.stack)
          })
    },
    // onCodeFormSubmit() {
    //   this.$refs.codeForm.validate()
    //       .then(() => {
    //
    //       })
    //       .catch()
    // },
    // onRegisterFormSubmit() {
    //   const {registerForm: r} = this
    //   if (r.usePwd) {
    //     this.$refs.registerForm.validate()
    //         .then()
    //         .catch()
    //   } else {
    //     this.$refs.registerForm.validate('username')
    //         .then()
    //         .catch()
    //   }
    // },
    // onLoginFormSubmit() {
    //   const {loginForm: l} = this
    //   if (l.usePwd) {
    //     this.$refs.loginForm.validate()
    //         .then()
    //         .catch()
    //   } else {
    //     this.$refs.loginForm.validate('account')
    //         .then()
    //         .catch()
    //   }
    // },
    num(val) {
      return /\d+/.test(val)
    },
    notEmpty(val) {
      return !!val
    },
    onSendCode() {
      // 1, 4 才需要发验证码
      const {step, codeForm, forgetForm} = this
      if ([1, 4].indexOf(step) < 0) return
      const form = step === 1 ? codeForm : forgetForm
      if (!form.phone) return
      if (form.waitSec && form.wait) return
      if (form.wait) return
      if (!form.waitSec && !form.wait) {
        getZhenziCode(form.phone)
        form.waitSec = 60
        form.wait = true
        window.intervalId = setInterval(() => {
          form.waitSec--
          if (form.waitSec === 0) {
            form.wait = false
            clearInterval(window.intervalId)
          }
        }, 1000)
      }
    },
    onBack() {
      const {step} = this
      this.step =
          step === 1 ? 0 :
              step === 2 ? 1 :
                  step === 3 ? 0 :
                      step === 4 ? 0 : 0
    }
  }
}
</script>

<style scoped>

</style>
