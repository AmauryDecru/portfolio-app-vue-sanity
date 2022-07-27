<template>
  <div class="bg-gray-800 rounded-lg p-4 flex flex-col sm:flex-row">
    <div class="flex-1 flex flex-col">
      <h3 class="text-lg md:text-2xl font-bol mb-4">{{ announcement.title }}</h3>
      <p v-if="announcement.summary" class="text-gray-500 md:text-lg mb-4 flex-1">{{ announcement.summary }}</p>
      <div class="flex sm:flex-col md:flex-row justify-between items-start md:items-end">
        <div class="flex items-center sm:mb-4 md:mb-0">
          <img v-if="announcement.author.profile_picture" src="" alt=""/>
          <p class="text-white mr-4">{{ announcement.author.username }}</p>
          <p class="text-gray-500 text-sm">{{ announcement._createdAt }}</p>
        </div>
      </div>
      <router-link :to="`/announcement/${ announcement._id }`" class="btn">Read more</router-link>
    </div>
    <img v-if="announcement.image" src="" alt="">
  </div>
</template>

<script>
export default {
  props: {
    announcement: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>