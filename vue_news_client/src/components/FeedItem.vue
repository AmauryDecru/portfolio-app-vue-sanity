<template>
  <div class="bg-gray-800 rounded-lg p-4 flex flex-col sm:flex-row">
    <img v-if="announcement.image" :src="CreateURL(announcement.image, 480, 320)" class="block w-full sm:max-w-xs mr-4 object-cover mb-4 sm:mb-0">
    <div class="flex-1 flex flex-col">
      <h3 class="text-lg md:text-2xl font-bold mb-4">{{ announcement.title }}</h3>
      <p v-if="announcement.summary" class="text-gray-500 md:text-lg mb-4 flex-1">{{ announcement.summary }}</p>
      <div class="flex sm:flex-col md:flex-row justify-between items-start md:items-end">
        <div class="flex items-center sm:mb-4 md:mb-0">
          <img v-if="announcement.author.profile_picture" :src="CreateURL(announcement.author.profile_picture, 100, 100)" class="rounded-full mr-4 w-12 h-12"/>
          <div>
            <p class="text-white mr-4">{{ announcement.author.username }}</p>
            <p class="text-gray-500 text-sm">{{ FormatDate(announcement._createdAt) }}</p>
          </div>
        </div>
        <router-link :to="`/announcement/${ announcement._id }`" class="btn">Read more</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { FormatDate, CreateURL} from "@/utilities";

export default {
  props: {
    announcement: {
      type: Object,
      required: true
    }
  },
  setup(){
    return {
      FormatDate,
      CreateURL
    }
  }
}
</script>

<style scoped>

</style>