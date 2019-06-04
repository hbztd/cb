<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-carousel>
        <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src" @click="test"></v-carousel-item>
      </v-carousel>
      <v-layout justify-center>
        <v-flex xs12 sm12>
          <listItem :cards="cards" />
        </v-flex>
      </v-layout>

      <v-card style="margin-top:20px;">
        <v-card-title class="headline">欢迎使用厨宝</v-card-title>
        <v-card-text>
          <p>内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充内容填充</p>
          <div class="text-xs-right">
            <em>
              <small>&mdash; Po</small>
            </em>
          </div>
          <hr class="my-3">
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import listItem from '~/components/listItem.vue'
export default {
  head: {
     title: '首页-厨宝',
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
  },
  data: () => ({
    items: [
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg"
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
      },
      {
        src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg"
      }
    ],
    cards: []
  }),
  methods: {
    test() {
      alert("test")
    },
    openArticle(article) {
      this.$router.push({
        name: 'article-id',
        // 使用params不能使用 path
        // path: `/article/${article.id}`,
        params: {article, id: article.id}
      })
    }
  },
  async created() {
    let { data } = await this.$axios.get('/api/indexArticle')
    if(data.status === 0) {
      this.cards = data.data
      // fill不能填充空数组
    } else {
      alert(data.msg)
    }
  },
  components: {
    listItem
  }
};
</script>
