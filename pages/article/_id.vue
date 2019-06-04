<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-card>
        <p class="display-1 text-md-center pt-2">{{ article.name }}</p>
        <v-img :src="article.title_img"/>
        <p
          class="body-2 mt-2 mb-0 ml-2 font-weight-light"
        >时间：{{ article.time }} 厨师：{{ article.cook }} {{ article.amount }}人做过这道菜</p>
        <blockquote class="blockquote">{{ article.description }}</blockquote>
        <video controls width="100%" v-show="article.video_src !== ''">
          <source :src="article.video_src" />
        </video>
      </v-card>

      <v-card class="mt-2">
        <v-card-title class="font-weight-bold headline pb-0">食材清单</v-card-title>
        <v-card-text>
          <div
            style="width:175px; height:70px; text-align:center; display:inline-block;"
            v-for="(food, index) in article.food"
            :key="index"
          >
            <p class="title mb-2">{{ food.foodName }}</p>
            <p class="caption font-weight-light">{{ food.foodAmount }}</p>
          </div>
        </v-card-text>
      </v-card>

      <v-card class="mt-2">
        <v-card-title class="font-weight-bold headline pb-0">小技巧</v-card-title>
        <v-card-text>
          <p
            v-for="(skill, index) in article.skill"
            :key="index"
          >{{index+1}}:{{skill}}</p>
        </v-card-text>
      </v-card>

    <v-card class="mt-2">
        <v-card-title class="font-weight-bold headline pb-0">做法步骤</v-card-title>
        <v-card-text>
          <p
            v-for="(flow, index) in article.flow"
            :key="index"
          >{{index+1}}:{{flow}}</p>
          <v-img :src="flowImg" v-for="(flowImg, i) in article.flow_img" :key="i+'img'"/>
        </v-card-text>
      </v-card>

      <v-card class="mt-2">
        <v-card-title
          class="font-weight-bold headline pb-0"
        >{{ article.other.title }}</v-card-title>
        <v-card-text>
          <p>{{ article.other.content }}</p>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      article: {
        id: '',
        name: '',
        title: '',
        cook: '',
        amount: 0,
        description: '',
        food: [],
        skill: [],
        flow: [],
        other: Object,
        video_src: '',
        title_img: '',
        flow_img: ''
      }
    }
  },
  head () {
    return {
      title: this.article.name,
      meta: [
        { hid: 'description', name: 'description', content: 'My custom description' }
      ]
    }
  },
  async created () {
    if(this.$route.params.article === undefined) {
      let { data } = await this.$axios.get(`/api/article/${this.$route.params.id}`)
      if(data.status === 0) {
        this.article = data.data
      } else {
        alert(data.msg)
      }
    } else {
      this.article = this.$route.params.article
    }
  }
}
</script>