<template>
  <div>
    <slot name="title"></slot>
    <slot name="notice"></slot>
    <div class="con">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="url in goodForm.imgUrls" :key="url">
          <img class="img-swiper" v-lazy="url"/>
        </van-swipe-item>
      </van-swipe>
      {{goodForm}}
      <van-form ref="goodForm">
        <van-field
            v-model="goodForm.name"
            label="物品名"
            placeholder="物品名"
            :rules="[{required: true, trigger: 'blur', message: '物品名不能为空'}]"
        />
        <van-field
            v-model="goodForm.des"
            label="物品描述"
            placeholder="物品描述"
        />
        <van-cell>
          <van-uploader
              v-model="goodForm.temImgUrls"
              :after-read="afterRead"
              :max-size="500 * 1024"
              @oversize="onOversize"
              multiple
          />
        </van-cell>
        <div style="margin: 16px;">
          <van-button @click="onSaveGood" round block type="info" native-type="submit">
            保存
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import {getGoodDetail, editGood} from "@/sevice/good";
import {getClient} from "../../utl/oss";
import {Toast} from "vant";
import {mapGetters} from 'vuex'

export default {
  name: "goodDetail",
  data() {
    return {
      goodForm: {
        id: '', // 物品id
        name: '', // 物品名
        des: '', // 物品描述
        imgUrls: [], // 物品图片
        temImgUrls: [],
      },
      client: null
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created() {
    this.initClint()
    this.getGoodDetail()
  },
  methods: {
    // 获取物品的详情
    // 暂时就是物品的图片
    getGoodDetail() {
      const {
        id,
        name,
        des,
        // good_img_url,
        create_date,
        delete_date
      } = this.$route.query
      this.goodForm.id = id
      this.goodForm.name = name
      this.goodForm.des = des
      this.goodForm.create_date = create_date
      this.goodForm.delete_date = delete_date
      getGoodDetail(id)
          .then(res => {
            const {data: {goodDetail: {good_img_urls}}} = res
            good_img_urls.forEach(img => {
              this.goodForm.imgUrls.push(img.url)
              this.goodForm.temImgUrls.push({
                url: img.url
              })
            })
          })
    },
    onOversize(file) {
      console.log(file);
      Toast('文件大小不能超过 500kb');
    },
    initClint() {
      getClient(client => {
        this.client = client
      })
    },
    onSaveGood() {
      this.$refs.goodForm.validate()
          .then(_ => {
            const {id, name, des, imgUrls} = this.goodForm
            editGood({
              good_id: id,
              name,
              des,
              imgUrls
            })
                .then(res => {
                  this.$router.push({
                    path: '/'
                  })
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
  }
}
</script>

<style scoped>
.img-swiper {
  width: 100%;
  max-height: 300px;
  object-fit: contain;
}
</style>