<template>
  <div>
    <nav-bar></nav-bar>
    <div class="con">
      <van-form ref="groupForm">
        <van-field
            v-model="groupForm.name"
            name="群名"
            label="群名"
            placeholder="群名"
            :rules="[{ required: true, message: '请填写群名' }]"
        />
        <van-field
            v-model="groupForm.desc"
            name="群描述"
            label="群描述"
            placeholder="群描述"
            type="textarea"
        />
        <van-field name="switch" label="自定义头像">
          <template #input>
            <van-switch v-model="groupForm.customAvatar" size="20"/>
          </template>
        </van-field>
        groupForm.avatarUrl
        <br>
        {{groupForm.avatarUrl}}
        <van-cell v-if="groupForm.customAvatar">
          <van-uploader v-model="groupForm.avatarUrl" :max-size="500 * 1024"
                        @oversize="onOversize"
                        :after-read="afterRead"
          />
        </van-cell>
        <van-field name="switch" label="邀请好友">
          <template #input>
            <van-switch v-model="groupForm.inviteFriend" size="20"/>
          </template>
        </van-field>
        groupForm.friend
        <br>
        {{groupForm.friend_id}}
        <van-checkbox-group v-if="groupForm.inviteFriend" v-model="groupForm.friend_id">
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
          <van-button round block type="info">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/navBar'
import ProfileBar from '../components/profileBar'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {Toast} from "vant";

export default {
  name: "newGroup",
  data() {
    return {
      result: '',
      groupForm: {
        name: '',
        desc: '',
        inviteFriend: false,
        friend_id: [],
        customAvatar: false,
        avatarUrl: []
      }
    }
  },
  components: {
    NavBar,
    ProfileBar
  },
  computed: {
    ...mapGetters([
      'friend'
    ])
  },
  created() {
    this.getFriend()
  },
  methods: {
    ...mapActions([
      'getFriend'
    ]),
    afterRead(file) {
      console.log(file)
      // file.status = 'uploading';
      // file.message = '上传中...';
      //
      // setTimeout(() => {
      //   file.status = 'failed';
      //   file.message = '上传失败';
      // }, 1000);
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    onOversize(file) {
      console.log(file);
      Toast('文件大小不能超过 500kb');
    },
  }
}
</script>

<style scoped>

</style>
