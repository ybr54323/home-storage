<!--创建物品-->
<template>
  <div>
    <slot name="nav-bar"></slot>
    <slot name="notice"></slot>
    <div class="con">
      {{group}}
      <br>
      {{goodForm}}
      <van-form ref="good-form">
        <van-field
            v-model="goodForm.name"
            label="物品名"
            placeholder="物品名"
            :rules="[{ required: true, message: '请填写物品名', trigger: 'blur' }]"
        />
        <van-field
            v-model="goodForm.des"
            label="物品描述"
            placeholder="物品描述"
            type="textarea"
            :rules="[]"
        />
      </van-form>
      <van-field name="switch" label="给物品配图">
        <template #input>
          <van-switch v-model="goodForm.isUseImg" size="20"/>
        </template>
      </van-field>
      <van-cell v-if="goodForm.isUseImg">
        <van-uploader
            v-model="goodForm.temImgUrls"
            :max-size="500 * 1024"
            @oversize="onOversize"
            :after-read="afterRead"
            multiple
        />
      </van-cell>
      <van-field name="switch" label="添加到空间">
        <template #input>
          <van-switch v-model="goodForm.isPutInGroup" size="20"/>
        </template>
      </van-field>
      <van-checkbox-group v-if="goodForm.isPutInGroup" v-model="goodForm.groupIds">
        <van-cell-group>
          <van-cell
              v-for="(g, index) in group"
              clickable
              :key="g.id"
              @click="toggle(index)"
          >
            <profile-bar :profile="g">
            </profile-bar>
            {{g}}
            <template #right-icon>
              <van-checkbox :name="g.id" ref="checkboxes"/>
            </template>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>

      <div style="margin: 16px;">
        <van-button @click="onCreateGood" round block type="info">
          提交
        </van-button>
      </div>
    </div>
  </div>

</template>

<script>
import {mapGetters, mapActions} from "vuex";
import ProfileBar from '../components/profileBar'
import {createGood} from "@/sevice/good";
import {Toast} from "vant";
import {getClient} from "../../utl/oss";

export default {
  name: "newGood",
  data() {
    return {
      goodForm: {
        name: '',
        des: '',
        isUseImg: false, // 是否给物品配图
        temImgUrls: [],
        imgUrls: [], // 物品图片上传完的urls
        isPutInGroup: false,
        groupIds: [], // 物品纳入的空间ids
      },
      client: null
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'group'
    ])
  },
  components: {
    ProfileBar
  },
  methods: {
    ...mapActions([
      'getFriend'
    ]),
    // 添加物品
    onCreateGood() {
      const {goodForm: g} = this
      this.$refs['good-form'].validate()
          .then(_ => {
            createGood({
              name: g.name,
              des: g.des,
              imgUrls: g.imgUrls,
              groupIds: g.groupIds
            })
                .then(res => {
                  this.$router.push({path: '/'})
                })
          })
    },
    afterRead(file) {
      file.status = 'uploading';
      file.message = '上传中...';
      const vm = this
      this.client.multipartUpload(`/home-storage/user_${this.userInfo.id}/good-img/${new Date().getTime()}_${file.file.name}`, file.file).then(function (result) {
        const {res: {requestUrls}} = result
        const [imgUrl] = requestUrls
        vm.goodForm.imgUrls.push(imgUrl)
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
    'goodForm.isUseImg': {
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
