<template>
  <main class="feed">
    <section class="container mx-auto p-4">
      <h1 class="text-2xl mn-8">Latest intel</h1>
      <div class="grid gap-4">
        <FeedItem v-for="(announcement, i) in announcements" :key="i" :announcement="announcement" />
      </div>
    </section>
  </main>
</template>

<script>
import {
  onMounted,
  onUnmounted,
  ref,
  computed
} from "vue"
import  { useStore } from "vuex"
import sanity from '../client'

import FeedItem from "@/components/FeedItem";

export default {
  components: {
    FeedItem
  },

  setup(){
    const subscription = ref(null)
    const store = useStore()

    const announcements = computed(() => store.getters.announcements)

    onMounted(() => {
      store.dispatch("GetAnnouncements", 3)

      const queryString = '*[_type == "announcement"]'

      subscription.value = sanity.listen(queryString).subscribe(update => {
            switch(update.transition)
            {
              case 'update':
                console.log("Announcement updated", update)
                break;

              case 'appear':
                console.log("Announcement Appeared", update)
                break;

              case 'disappear':
                console.log("Announcement Disappeared", update)
                break;
            }
          })
    })

    onUnmounted(() => {
      subscription.value.unsubscribe()
    })

    return announcements
  }
}
</script>