import { createStore } from 'vuex'
import sanity from '../client.js'

export default createStore({
  state: {
    menu_is_active: false,
    announcements: [],
    authors: [],
    numberOfAnnouncements: 0
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
    },

    SET_NUMBEROFANNOUNCEMENTS(state, numberOfAnnouncements){
      state.numberOfAnnouncements = numberOfAnnouncements
    },

    ADD_TO_NUMBEROFANNOUNCEMENTS(state, int = 1){
      state.numberOfAnnouncements += int
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
      const count = 'count(*[_type == "announcement"])'

      sanity.fetch(queryString).then(announcements => {
        commit('SET_ANNOUNCEMENTS', announcements)
      })

      sanity.fetch(count).then(count => {
        commit('SET_NUMBEROFANNOUNCEMENTS', count)
      })
    },
    // Listen for updates of announcements to instantly update FeedItem
    UpdateAnnouncement({commit}, announcement){
      commit('SET_ANNOUNCEMENTS', this.state.announcements.map(a => a._id === announcement._id ? announcement : a))
    },
    // Listen for creation of new announcements to instantly update HomeView with new FeedItem
    CreateAnnouncement({commit}, announcement){
      commit('SET_ANNOUNCEMENTS', [...this.state.announcements, announcement])
      commit('ADD_TO_NUMBEROFANNOUNCEMENTS')
    },
    // Listen for deletion of announcements to instantly remove the corresponding FeedItem from HomeView
    DeleteAnnouncement({commit}, announcementId){
      commit('SET_ANNOUNCEMENTS', this.state.announcements.filter(a => a._id !== announcementId))
      commit('ADD_TO_NUMBEROFANNOUNCEMENTS', -1)
    },
    // Load more FeedItems with Announcements
    LoadMore({commit}, limit = 5){
      const queryString = `*[_type == "announcement"] {..., author-> } | order(_createdAt desc) 
      [${this.state.announcements.length}...${this.state.announcements.length + limit}]`

      sanity.fetch(queryString).then(announcements => {
        commit('SET_ANNOUNCEMENTS', [...this.state.announcements, ...announcements])
      })
    }
  },
  modules: {
  }
})
