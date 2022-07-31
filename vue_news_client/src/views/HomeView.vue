<template>
  <img src="../assets/banner_transparent.jpg" alt="BSF banner" class="w-full bg-gradient-to-tr">
  <main class="feed">
    <section class="container mx-auto p-8 items-center text-center">
      <h1 class="title_intro text-5xl mb-8 font-Electrolize">Welcome to BSF!</h1>
      <p class="text-white md:text-lg mb-14 flex-1 pl-48 pr-48">
        BSF was created in the beginning of January 2020.<br>
        A couple of friends decided that they should start their own unit with the focus on the players, where everyone is treated equally.<br>
        The main idea is to create a very friendly environment with people who share the same love for ArmA 3.<br>
        Thus, The Belgian Special Forces (BSF) Milsim & Gaming Community was born, and quickly grew into a tight but welcoming group of online friends and gaming enthusiasts.<br>
        <br>
        As a unit, we try to organize an Arma 3 operation weekly, which is completely built by hand from the ground up, providing a unique experience each time you play.
        During these ops, we try to use real life combat tactics and strategies, but tend to keep the overall experience casual.
        Having fun should be the most important thing after all. That's why we like to categorize BSF as a casual and Semi-Realistic milsim unit.<br>
        <br>
        As our community grew, so did the number of games we play together. Other than Arma 3, we play Ready Or Not, Arma Reforger and even Sea Of Thieves!<br>
      </p>
    </section>
    <section class="mx-auto w-full p-24 bg-gray-800 items-center text-center">
      <div class="container mx-auto p-8 bg-gray-800 items-center text-center">
        <swiper :navigation="true" :modules="modules" class="carousel">
          <swiper-slide>
            <img src="../assets/Arma_3.png" alt="Potential recruitment poster">
          </swiper-slide>
          <swiper-slide>
            <img src="../assets/ArmA_3_1.png" alt="Corporal HollowPointsz">
          </swiper-slide>
          <swiper-slide>
            <img src="../assets/ArmA_3_2.png" alt="Operation Knock Knock">
          </swiper-slide>
          <swiper-slide>
            <img src="../assets/ArmA_3_3.png" alt="Operation Last Flight">
          </swiper-slide>
          <swiper-slide>
            <img src="../assets/ArmA_3_4.png" alt="MrBy3By3">
          </swiper-slide>
        </swiper>
      </div>
    </section>
    <section class="container mx-auto p-4">
      <h1 class="text-2xl mb-8">Latest intel</h1>
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
  computed,
} from "vue"
import  { useStore } from "vuex"
import sanity from '../client'

import FeedItem from "@/components/FeedItem"

import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import {Navigation} from "swiper";
export default {
  components: {
    FeedItem,
    Swiper,
    SwiperSlide
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

    return {
      announcements,
      modules: [Navigation]
    }
  },
}
</script>