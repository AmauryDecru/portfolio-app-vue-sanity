<template>
  <div class="bg-gray-700 min-h-screen text-white">
    <Navbar/>
    <DropdownMenu/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import DropdownMenu from "@/components/DropdownMenu";
export default {
  components: {
    DropdownMenu,
    Navbar
  }
}
</script>

<style>
</style>
