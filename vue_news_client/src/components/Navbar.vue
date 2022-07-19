<template>
<header class="flex w-full items-center justify-center p-4">
  <div :class="`menu-toggle relative z-50 ${menu_is_active ? 'is-active':''}`" @click="ToggleDropDown">
    <div class="dropdown">
      <span></span>
    </div>

  </div>

  <h1 class="text center text-2x1 uppercase font-light tracking-widest">
    BSF Mission Announcements
  </h1>
</header>
</template>

<script>
import {computed} from "vue"
import {useStore} from 'vuex'

export default {
  setup(){
    const store = useStore()

    const ToggleDropDown = () => {
      store.dispatch('ToggleDropDown')
    }

    return{
      menu_is_active: computed(() => store.state.menu_is_active),
      ToggleDropDown
    }
  },
  name: "Navbar-vue"
}
</script>

<style scoped>
.dropdown-toggle{
  position:absolute;
  top: 1rem;
  left: 1rem;
  width: 32px;
  height: 32px;
  cursor: pointer;
}

.dropdown{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>