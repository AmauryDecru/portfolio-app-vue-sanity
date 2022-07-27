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
.btn{
  @apply bg-yellow-500 duration-300 font-bold py-2 px-4 rounded-lg inline-block;
}

.btn:hover{
  @apply bg-yellow-600;
}
</style>
