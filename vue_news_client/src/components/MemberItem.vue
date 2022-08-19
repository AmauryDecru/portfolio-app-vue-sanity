<template>
  <div class="bg-gray-800 rounded-lg p-4 text-center">
    <div v-if="member">
      <img :src="CreateURL(member.profile_picture)" class="inline-block rounded-full w-32 h-32 mb-4">
      <h3 class="text-2xl font-bold mb-4">{{ member.username }}</h3>
      <p class="text-white mb-4">{{ member.bio }}</p>
      <router-link :to="`/member/${member._id}`" class="btn">Visit Profile</router-link>
    </div>
  </div>
</template>

<script>
import {CreateURL} from "@/utilities";
export default {
  props: {
    member: {
      type: Object,
      required: true
    }
  },

  setup(){
    return{
      CreateURL
    }
  }
}
</script>

<style scoped>

</style>