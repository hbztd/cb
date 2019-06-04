<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" fixed app width="230">
      <v-list>
        <v-list-tile router exact :to="`/`">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>首页</v-list-tile-title>
        </v-list-tile>
        <v-list-group prepend-icon="turned_in" value="true" v-for="(menu, index) in menus" :key="index">
          <!-- 一级目录 -->
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title v-text="menu.catalogName"/>
            </v-list-tile>
          </template>
          <!-- 二级目录 -->
          <v-list-group no-action sub-group value="true" v-for="(sub, index) in menu.sub" :key="index">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title v-text="sub.catalogName"/>
              </v-list-tile>
            </template>
            <!-- 三级目录 -->
            <v-list-tile v-for="(type, index) in sub.type" :key="index" 
              :to="`/list/${type.typeUrl}`" router exact>
              <v-list-tile-title v-text="type.typeName" />
            </v-list-tile>
          </v-list-group>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar :clipped-left="clipped" fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer"/>
      <v-toolbar-title v-text="title"/>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field placeholder="搜索" v-show="showSearch" v-model="search" @keyup.enter="$router.push(`/search?query=${search}`)"></v-text-field>
      <v-icon @click="showSearch = !showSearch">search</v-icon>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>
    <v-footer fixed app>
      <span>&copy; 厨宝</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      menus: [],
      title: "厨宝",
      showSearch: false,
      search: ''
    };
  },
  async created(){
    let { data } = await this.$axios.get("/api/menu")
    if(data.status === 0) {
      this.menus = data.data
      let payload = []
      data.data.forEach(i => {
        i.sub.forEach(j => {
          j.type.forEach(k => {
            payload.push({name: k.typeName, url: k.typeUrl})
          })
        })
      })
      this.$store.commit('updateUrlToName',payload)
    } else {
      alert(data.msg)
    }
  }
};
</script>
