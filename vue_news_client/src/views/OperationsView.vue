<template>
  <section class="container mx-auto p-4">
    <h1 class="text-2xl mb-8">Latest intel</h1>
    <div class="grid gap-4">
      <FeedItem v-for="(operation, i) in operations" :key="i" :announcement="operation" />
    </div>
    <button v-if="$store.state.numberOfOperations > operations.length" @click="$store.dispatch('LoadMoreOperations', 1)" class="btn mt-8" >
      Load More ({{$store.state.numberOfOperations - operations.length}})
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

    const operations = computed(() => store.getters.operations)

    onMounted(() => {
      store.dispatch("GetOperations", 2)

      const queryString = '*[_type == "announcement" && is_operation == "true"]'

      subscription.value = sanity.listen(queryString).subscribe(update => {
        switch(update.transition)
        {
          case 'update':
            sanity.getDocument(update.result.author._ref).then(author => {
              store.dispatch('UpdateOperation', {
                ...update.result, author
              })
            })
            console.log("Operation updated", update)
            break;

          case 'appear':
            sanity.getDocument(update.result.author._ref).then(author => {
              store.dispatch('CreateOperation', {
                ...update.result, author
              })
            })
            console.log("Operation Appeared", update)
            break;

          case 'disappear':
            store.dispatch('DeleteOperation', update.documentId)
            console.log("Operation Disappeared", update)
            break;
        }
      })
    })

    onUnmounted(() => {
      subscription.value.unsubscribe()
    })

    return {
      operations
    }
  },
}
</script>

<style scoped>

</style>