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
      <van-button class="btn" @click="skipEditGood" block round type="primary">编辑物品</van-button>
      <van-button v-if="canDelGood" class="btn" @click="delGroup" block round type="danger">删除物品</van-button>
    </div>
  </div>
</template>

<script>
import {getGoodDetail, delGood} from "@/sevice/good";
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
        createDate: '',
        deleteDate: '',
        ownerUserId: '', // 物品所属
      },
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ]),
    canDelGood() {
      return +this.goodForm.ownerUserId === +this.userInfo.id
    }
  },
  created() {
    this.getGoodDetail()
  },
  methods: {
    delGroup() {
      this.$dialog.confirm({
        title: '',
        message: '确定删除?'
      })
          .then(_ => {
            delGood(this.goodForm.id)
          })
          .catch()
    },
    skipEditGood() {
      this.$router.push({
        path: '/edit_good'
      })
    },
    // 获取物品的详情
    // 暂时就是物品的图片
    getGoodDetail() {
      const {
        id,
        name,
        des,
        // good_img_url,
        create_date,
        delete_date,
        owner_user_id
      } = this.$route.query
      this.goodForm.id = id
      this.goodForm.name = name
      this.goodForm.des = des
      this.goodForm.createDate = create_date
      this.goodForm.deleteDate = delete_date
      this.goodForm.ownerUserId = owner_user_id
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
    }
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
