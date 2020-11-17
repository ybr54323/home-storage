<template>
  <div>
    <van-nav-bar
        @click-left="onBack"
        left-arrow
    >
    </van-nav-bar>
    <div class="con">
      <div class="step0" v-if="step===0">
        <van-button class="btn" @click="step = 1" type="primary" block>手机号码验证码登录</van-button>
        <van-button class="btn" @click="step = 3" type="primary" block>账号密码登录</van-button>
        <van-button class="btn" @click="step = 4" type="primary" block>重设登录密码</van-button>
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
              v-model="loginForm.phone"
              type="text"
              name="phone"
              clearablel
              label="手机号"
              placeholder="请输入手机号码 / 用户名"
              :rules="[{ required: true, message: '手机号码不能为空', trigger: 'blur', validator: notEmpty }]"
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
        {{resetForm}}
        <van-form ref="resetForm">
          <van-field
              v-model="resetForm.phone"
              type="tel"
              clearablel
              label="手机号"
              placeholder="请输入手机号"
              :rules="[{ required: true, message: '请输入手机号', trigger: 'blur', validator: num }]"
          />
          <van-field
              v-model="resetForm.code"
              type="digit"
              clearable
              center
              label="短信验证码"
              placeholder="请输入短信验证码"
              :rules="[{ required: true, message: '请输入短信验证码', trigger: 'blur',validator: num }]"
          >
            <template #button>
              <van-button :disabled="resetForm.wait" size="small" type="primary" @click="onSendCode">
                {{resetForm.wait ? resetForm.waitSec + 's' : '发送验证码'}}
              </van-button>
            </template>
          </van-field>
          <van-field
              v-model="resetForm.pwd"
              :type="resetForm.viewPwd ? 'text':'password'"
              clearable
              label="密码"
              placeholder="请输入密码"
              :rules="[{ required: true, message: '密码不能为空', trigger: 'blur',validator: notEmpty }]"
          >
            <template #button>
              <van-icon name="eye-o" color="#07c160" @click="resetForm.viewPwd = !resetForm.viewPwd">
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
import {
  getRegisterOrLoginCode, // 获取 注册 / 登录 的短信验证码
  registerOrLogin, // 短信验证码 注册 / 登录 新用户-注册 老用户-直接登录
  register,
  phonePwdLogin,
  getResetCode,
  resetPwd
} from '@/sevice/user'

export default {
  name: "Login",
  data() {
    /**
     *
     * @type {Map<number, {leftText: string, title: string}>}
     * key: 1: 发送验证码 code 2: 新用户 3: 账号密码登录 4.重设密码
     */
    const operationMap = new Map([
      [0, {title: '登录', leftText: '返回'}],
      [
        1, {title: '发送验证码', leftText: '返回'}
      ],
      [
        2, {title: '注册新用户', leftText: '返回发送验证码页'}
      ],
      [
        3, {title: '账号密码登录', leftText: '返回'}
      ],
      [
        4, {title: '重设密码', leftText: '返回'}]
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
        phone: '',
        pwd: '',
        viewPwd: false
      },
      resetForm: {
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
      return op.get(step).title || ''
    },
    leftText() {
      const {step, operationMap: op} = this
      if (!step) return
      return op.get(step).leftText || ''
    }
  },
  created() {
    this.setShowTarBar(false)
    const {step = 0} = this.$route.params
    this.step = +step
  },
  mounted() {
  },
  components: {},
  methods: {
    ...mapMutations(['setUserInfo', 'setShowTarBar']),
    onSubmit() {
      // 0: 初始状态 1: 发送登录/注册验证码 2: 新用户 3: 账号密码登录 4.重设密码
      const {step, codeForm, registerForm, loginForm, resetForm, $refs: ref} = this
      const [
        form, v, api // 表单, 校验方法, 请求接口
      ] = step === 1 ?
          [
            codeForm,
            () => ref['codeForm'].validate(),
            (f2) => registerOrLogin(f2)
          ] :
          step === 2 ?
              [
                registerForm,
                (f1) => ref['registerForm'].validate(f1.usePwd ? undefined : 'username'),
                (f2) => register(f2)
              ] :
              step === 3 ?
                  [
                    loginForm,
                    (f1) => ref['loginForm'].validate(f1.usePwd ? undefined : 'phone'),
                    (f2) => phonePwdLogin(f2)
                  ] :
                  step === 4 ?
                      [
                        resetForm,
                        () => ref['resetForm'].validate(),
                        (f2) => resetPwd(f2)
                      ] : [
                        null, null, null
                      ]
      v(form)
          .then(() => {
            api(form)
                .then(res => {
                  const {data: {user, user: {isNewUser}}} = res
                  if (isNewUser) {
                    this.step = 2
                    return
                  }
                  this.setUserInfo(user)
                  this.$socket.emit('login', {
                    query: {
                      userId: user.id
                    }
                  })
                  window.localStorage.setItem('userInfo', JSON.stringify(user))
                  this.setShowTarBar(true)
                  this.$router.push({path: '/', query: {}})
                })
                .catch(code => {
                })
          })
          .catch(err => {
            console.warn(err.stack)
          })
    },
    num(val) {
      return /\d+/.test(val)
    },
    notEmpty(val) {
      return !!val
    },
    onSendCode() {
      // 1, 4 才需要发验证码
      const {step, codeForm, resetForm} = this
      if ([1, 4].indexOf(step) < 0) return
      const [api, form] = step === 1 ?
          [
            getRegisterOrLoginCode,
            codeForm
          ] :
          [
            getResetCode,
            resetForm
          ]
      if (!form.phone) return
      if (form.waitSec && form.wait) return
      if (form.wait) return
      if (!form.waitSec && !form.wait) {
        // TODO 还没判断发送是否成功
        api(form)
            .then()
            .catch()

        form.waitSec = 10
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
