<template>
  <v-card>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex v-for="(card, index) in cards" :key="index" xs6>
          <v-card @click="openArticle(card)">
            <v-img :src="card.title_img" height="200px">
              <v-container fill-height fluid pa-2>
                <v-layout fill-height>
                  <v-flex xs12 align-end flexbox>
                    <span class="title black--text blue lighten-5" v-text="card.title"></span>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-img>
            <v-slide-y-transition>
              <v-card-text>
                <p class="text-truncate">{{ card.description }}</p>
              </v-card-text>
            </v-slide-y-transition>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  methods: {
    openArticle(article) {
      this.$router.push({
        name: "article-id",
        params: { article, id: article.id }
      });
    }
  },
  props: ["cards"]
};
</script>

