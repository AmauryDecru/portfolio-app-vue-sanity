<template>
  <main class="Members page">
    <section class="container mx-auto p-4">
      <h1 class="text-2xl mb-8">BSF Council Members</h1>
    </section>
  </main>
</template>

<script>
import {onMounted, computed} from "vue";
import {useStore} from "vuex";

export default {
  setup(){
    const store = useStore()
    const members = computed(() => store.getters.members)

    onMounted(() => {
      store.dispatch('GetMembers')
    })

    return{
      members
    }
  }
}
</script>