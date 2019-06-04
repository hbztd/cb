<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-layout justify-center>
        <v-flex xs12 sm12>
         <listItem :cards="cards" />
        </v-flex>
      </v-layout>
      <div class="text-xs-center">
      <v-pagination
        v-model="page"
        :length="total"
        :total-visible="7"
      ></v-pagination>
    </div>
    </v-flex>
  </v-layout>
</template>

<script>
import listItem from '~/components/listItem.vue'
export default {
  head () {
      return {
        title: `搜索`,
        meta: [
          { hid: 'description', name: 'description', content: 'My custom description' }
        ]
      }
  },
  data: () => ({
    cards: [],
    page: 1,
    total: 0,
    title: '',
  }),
  methods: {
    openArticle(article) {
      this.$router.push({
        name: 'article-id',
        params: {article, id: article.id}
      })
    }
  },
  watch: {
    async page (newValue) {
      let value = this.$route.query.query
      let { data } = await this.$axios.get(`/api/search?condition=${value}&start=${this.page-1}&end=${this.page}`)
      if(data.status === 0) {
        this.cards = data.data
        document.documentElement.scrollTop = 0
        window.pageYOffset = 0
        document.body.scrollTop = 0
      } else {
        alert(data.msg)
      }
    }
  },
  async created() {
    let value = this.$route.query.query
    console.log(value)
    let { data } = await this.$axios.get(`/api/amount?way=SEARCH&value=${value}`)
    if(data.status === 0) {
      this.total = data.data
      let res = await this.$axios.get(`/api/search?condition=${value}&start=0&end=1`)
      if(res.data.status === 0) {
        this.cards = res.data.data
        console.log(this.cards)
      } else {
        alert(res.data.msg)
      }
    } else {
      alert(data.msg)
    }
  },
  components: {
    listItem
  }
};
</script>
