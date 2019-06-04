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
        title: this.title,
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
  watch: {
    async page (newValue) {
      let value = this.$route.params.url
      let { data } = await this.$axios.get(`/api/typeArticle/${value}?start=${this.page-1}&end=${this.page}`)
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
    let value = this.$route.params.url
    let title = this.$store.getters.getName(value)
    this.title = title
    let { data } = await this.$axios.get(`/api/amount?way=TYPE&value=${value}`)
    if(data.status === 0) {
      this.total = data.data
      let res = await this.$axios.get(`/api/typeArticle/${value}?start=0&end=1`)
      if(res.data.status === 0) {
        this.cards = res.data.data
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
