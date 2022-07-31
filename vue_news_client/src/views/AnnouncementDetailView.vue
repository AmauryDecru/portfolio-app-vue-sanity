<template>
  <main class="announcement-page">
    <section v-if="announcement" class="container mx-auto p-4">
      <img :src="CreateURL(announcement.image, 1280, 300)" class="w-full mb-8">
      <button @click="$router.back()" class="flex items-center text-lg text-red-500 hover:text-red-600 duration-300 mb-4">
        <span class="material-icons text-lg mr-1">keyboard_double_arrow_left</span> Return
      </button>
      <h1 class="text=3xl md:text-5xl mb-8">{{ announcement.title }}</h1>
      <p></p>
    </section>
    <section v-else>
      <p class="text-white italic text-2xl">Loading ...</p>
    </section>
  </main>
</template>

<script>
import {onMounted, ref} from 'vue'
import {useRoute} from 'vue-router'
import sanity from '../client'
import {CreateURL} from "@/utilities";

export default {
  setup(){
    const route = useRoute();
    const id = ref(route.params.id)
    const announcement = ref(null)

    onMounted(() => {
      const queryString = '*[_type == "announcement" && _id == $id][0] { ..., author-> }'
      const params = { id: id.value }

      sanity.fetch(queryString, params).then(data => {
        announcement.value = data
      })
    })

    return{
      announcement,
      CreateURL
    }
  }
}
</script>

<style scoped>

</style>