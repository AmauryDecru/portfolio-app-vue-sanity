import { createStore } from 'vuex'
import sanity from '../client.js'

export default createStore({
  state: {
    menu_is_active: false,
    announcements: [],
    authors: [],
    total_announcements: 0
  },
  getters: {
    announcements: state => state.announcements.sort((a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()),
  },
  mutations: {
    TOGGLE_DROPDOWN(state, dir = null){
      if (dir === 'open'){
        state.menu_is_active = true
      }
      else if (dir === 'close') {
        state.menu_is_active = false
      }
      else {
        state.menu_is_active = !state.menu_is_active
      }
    },
    SET_ANNOUNCEMENTS(state, announcements){
      state.announcements = announcements
    }
  },
  actions: {
    ToggleDropDown({commit}){
      commit('TOGGLE_DROPDOWN')
    },
    // GET announcements from Sanity API
    GetAnnouncements({commit}, limit = null){
      const queryString = `*[_type == "announcement"] {..., author-> } |
                            order(_createdAt desc) ${limit ? `[0...${limit}]` : ''}`

      sanity.fetch(queryString).then(announcements => {
        commit('SET_ANNOUNCEMENTS', announcements)
      })
    },
    // Listen for updates of announcements to instantly update FeedItem
    UpdateAnnouncement({commit}, announcement){
      commit('SET_ANNOUNCEMENTS', this.state.announcements.map(a => a._id === announcement._id ? announcement : a))
    },
    // Listen for creation of new announcements to instantly update HomeView with new FeedItem
    CreateAnnouncement({commit}, announcement){
      commit('SET_ANNOUNCEMENTS', [...this.state.announcements, announcement])
    },
    // Listen for deletion of announcements to instantly remove the corresponding FeedItem from HomeView
    DeleteAnnouncement({commit}, announcementId){
      commit('SET_ANNOUNCEMENTS', this.state.announcements.filter(a => a._id !== announcementId))
    }
  },
  modules: {
  }
})
