<template>
  <section class="container mx-auto p-4">
    <h1 class="text-2xl mb-8">BSF News</h1>
    <div class="grid gap-4">
      <FeedItem v-for="(newsItem, i) in newsItems" :key="i" :announcement="newsItem" />
    </div>
    <button v-if="$store.state.numberOfNewsItems > newsItems.length" @click="$store.dispatch('LoadMoreNewsItems', 1)" class="btn mt-8" >
      Load More ({{$store.state.numberOfNewsItems - newsItems.length}})
    </button>
  </section>
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
export default {
  components: {
    FeedItem,
  },

  setup(){
    const subscription = ref(null)
    const store = useStore()

    const newsItems = computed(() => store.getters.newsItems)

    onMounted(() => {
      store.dispatch("GetNewsItems", 2)

      const queryString = '*[_type == "announcement" && is_operation == false]'

      subscription.value = sanity.listen(queryString).subscribe(update => {
        switch(update.transition)
        {
          case 'update':
            sanity.getDocument(update.result.author._ref).then(author => {
              store.dispatch('UpdateNewsItem', {
                ...update.result, author
              })
            })
            console.log("News item updated", update)
            break;

          case 'appear':
            sanity.getDocument(update.result.author._ref).then(author => {
              store.dispatch('CreateNewsItem', {
                ...update.result, author
              })
            })
            console.log("News Item Appeared", update)
            break;

          case 'disappear':
            store.dispatch('DeleteNewsItem', update.documentId)
            console.log("News Item Disappeared", update)
            break;
        }
      })
    })

    onUnmounted(() => {
      subscription.value.unsubscribe()
    })

    return {
      newsItems
    }
  },
}
</script>

<style scoped>

</style>