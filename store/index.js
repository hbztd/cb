export const state = () => ({
  urlToName: []
})

export const getters = {
  getName: (state) => (url) => {
    let name = ''
    state.urlToName.forEach(i => {
      if(i.url === url) {
        name = i.name
      }
    })
    return name
  }
}

export const mutations = {
  updateUrlToName(state, payload) {
    state.urlToName = payload
  }
}