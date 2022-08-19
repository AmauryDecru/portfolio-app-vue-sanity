import { createStore } from 'vuex'
import sanity from '../client.js'

export default createStore({
  state: {
    menu_is_active: false,
    announcements: [],
    operations: [],
    newsItems: [],
    authors: [],
    numberOfAnnouncements: 0,
    numberOfOperations: 0,
    numberOfNewsItems: 0
  },
  getters: {
    announcements: state => state.announcements.sort((a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()),
    operations: state => state.operations.sort((a, b) => new Date(b._createdAt).getTime() - new Date(a._createdAt).getTime()),
    members: state => state.members
  },
  mutations: {
    // MENU MUTATIONS
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

    // ANNOUNCEMENT MUTATIONS
    SET_ANNOUNCEMENTS(state, announcements){
      state.announcements = announcements
    },

    SET_NUMBEROFANNOUNCEMENTS(state, numberOfAnnouncements){
      state.numberOfAnnouncements = numberOfAnnouncements
    },

    ADD_TO_NUMBEROFANNOUNCEMENTS(state, int = 1){
      state.numberOfAnnouncements += int
    },

    // OPERATION MUTATIONS
    SET_OPERATIONS(state, operations){
      state.operations = operations
    },

    SET_NUMBEROFOPERATIONS(state, numberOfOperations){
      state.numberOfOperations = numberOfOperations
    },

    ADD_TO_NUMBEROFOPERATIONS(state, int = 1){
      state.numberOfOperations += int
    },

    // MEMBER MUTATIONS
    SET_MEMBERS(state, members){
      state.members = members
    }
  },
  actions: {
    // MENU FUNCTIONS
    ToggleDropDown({commit}){
      commit('TOGGLE_DROPDOWN')
    },

    CloseMenu({commit}){
      commit('TOGGLE_DROPDOWN', 'close')
    },

    // ANNOUNCEMENTS CRUD
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
    },

    // OPERATIONS CRUD
    GetOperations({commit}, limit = null){
      const queryString = `*[_type == "announcement" && is_operation == true] {..., author-> } | 
                            order(_createdAt desc) ${limit ? `[0...${limit}]` : ''}`
      const count = 'count(*[_type == "announcement" && is_operation == true])'

      sanity.fetch(queryString).then(operations => {
        commit('SET_OPERATIONS', operations)
      })

      sanity.fetch(count).then(count => {
        commit('SET_NUMBEROFOPERATIONS', count)
      })
    },

    UpdateOperation({commit}, operation){
      commit('SET_OPERATIONS', this.state.operations.map(o => o._id === operation._id ? operation : o))
    },

    CreateOperation({commit}, operation){
      commit('SET_OPERATIONS', [...this.state.announcements, operation])
      commit('ADD_TO_NUMBEROFOPERATIONS')
    },

    DeleteOperation({commit}, operationId){
      commit('SET_OPERATIONS', this.state.announcements.filter(o => o._id !== operationId))
      commit('ADD_TO_NUMBEROFOPERATIONS')
    },

    LoadMoreOperations({commit}, limit = 5) {
      const queryString = `*[_type == "announcement" && is_operation == true] {..., author-> } | order(_createdAt desc) 
      [${this.state.operations.length}...${this.state.operations.length + limit}]`

      sanity.fetch(queryString).then(operations => {
        commit('SET_OPERATIONS', [...this.state.operations, ...operations])
      })
    },

    // MEMBERS CRUD
    // GET Members from Sanity API
    GetMembers({commit}){
      const queryString = `*[_type == "member"] | order(_createdAt)`

      sanity.fetch(queryString).then(members => {
        commit('SET_MEMBERS', members)
      })
    }
  },
  modules: {
  }
})
