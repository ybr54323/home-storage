<template>
  <div>
    <slot name="nav-bar"></slot>
    <slot name="notice"></slot>
    <div class="con">
      <van-form ref="groupForm">
        <van-field
            v-model="groupForm.name"
            label="群名"
            placeholder="群名"
            :rules="[{ required: true, message: '请填写群名', trigger: 'blur' }]"
        />
        <van-field
            v-model="groupForm.desc"
            label="群描述"
            placeholder="群描述"
            type="textarea"
        />
        <van-field name="switch" label="自定义头像">
          <template #input>
            <van-switch v-model="groupForm.customAvatar" size="20"/>
          </template>
        </van-field>
      </van-form>
      <van-cell v-if="groupForm.customAvatar">
        <van-uploader v-model="groupForm.temAvatarUrl" :max-size="500 * 1024"
                      @oversize="onOversize"
                      :after-read="afterRead"
        />
      </van-cell>
      <van-field name="switch" label="邀请好友">
        <template #input>
          <van-switch v-model="groupForm.inviteFriend" size="20"/>
        </template>
      </van-field>
      <van-checkbox-group v-if="groupForm.inviteFriend" v-model="groupForm.friendIds">
        <van-cell-group>
          <van-cell
              v-for="(f, index) in friend"
              clickable
              :key="f.id"
              @click="toggle(index)"
          >
            <profile-bar :profile="f">
            </profile-bar>
            <template #right-icon>
              <van-checkbox :name="f.id" ref="checkboxes"/>
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <div style="margin: 16px;">
        <van-button @click="onCreateGroup" round block type="info">
          提交
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileBar from '../components/profileBar'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {Toast} from "vant";
import {getClient} from "../../utl/oss";
import {createGroupMessage} from "@/sevice/message";
import {createGroup} from "@/sevice/group";

export default {
  name: "newGroup",
  data() {
    return {
      result: '',
      groupForm: {
        name: '',
        desc: '',
        inviteFriend: false, // 是否邀请用户
        friendIds: [], // 空间邀请的用户ids
        customAvatar: false, // 是否带空间头像
        temAvatarUrl: [],
        avatarUrl: '' // 阿里oss的图片url
      },
      client: null
    }
  },
  components: {
    ProfileBar
  },
  computed: {
    ...mapGetters([
      'friend',
      'userInfo'
    ])
  },
  created() {
    this.getFriend()
  },
  methods: {
    ...mapActions([
      'getFriend'
    ]),
    onCreateGroup() {
      this.$refs.groupForm.validate()
          .then(_ => {
            // 1.create group 2.if invite,create message
            createGroup(this.groupForm)
                .then(_ => {
                  this.$socket.emit('inviteFriend', {
                    query: {
                      source_user_id: this.userInfo.id,
                      target_user_ids: this.groupForm.friendIds
                    }
                  })
                  this.$router.push({path: '/'})
                })
          })
    },
    afterRead(file) {
      file.status = 'uploading';
      file.message = '上传中...';
      const vm = this
      this.client.multipartUpload(`/home-storage/user_${this.userInfo.id}/${new Date().getTime()}_${file.file.name}`, file.file).then(function (result) {
        const {res: {requestUrls}} = result
        const [avatarUrl] = requestUrls
        vm.groupForm.avatarUrl = avatarUrl
        file.status = 'success';
        file.message = '上传成功';
      }).catch(function (err) {

      })
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    onOversize(file) {
      console.log(file);
      Toast('文件大小不能超过 500kb');
    },
  },
  watch: {
    'groupForm.customAvatar': {
      handler(curValue, oldValue) {
        if (curValue) {
          getClient(client => {
            this.client = client
          })
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
