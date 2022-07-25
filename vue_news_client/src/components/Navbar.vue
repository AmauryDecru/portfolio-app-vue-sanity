<template>
<header class="flex w-full items-center justify-center p-4">
  <div :class="`menu-toggle relative z-50 ${
    menu_is_active
    ? 'is-active'
    : ''
  }`"
  @click="ToggleDropDown">
    <div class="hamburger">
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
:deep(.menu-toggle){
  position:absolute;
  top: 1rem;
  left: 1rem;
  width: 32px;
  height: 32px;
  cursor: pointer;
}

.hamburger{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
}

.hamburger span{
  top: 50%;
  transform: translateY(-50%);
}

.hamburger span,
.hamburger span:before,
.hamburger span:after{
  position: absolute;
  width: 100%;
  height: 4px;
  border-radius: 99px;
  background-color: white;
  transition: all 0.3s ease-in-out;
}

.hamburger span:before,
.hamburger span:after{
  content: '';
}

.hamburger span:before{
  top: -8px;
}

.hamburger span:after{
  top: 8px;
}
</style>