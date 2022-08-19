<template>
  <main class="Members page">
    <section class="container mx-auto p-4">
      <h1 class="text-2xl mb-8">BSF Council Members</h1>
      <div class="grid md:grid-cols-3 gap-4">
        <MemberItem v-for="(member, i) in members" :key="i" :member="member"/>
      </div>
    </section>
  </main>
</template>

<script>
import {onMounted, computed} from "vue";
import {useStore} from "vuex";
import MemberItem from "@/components/MemberItem";

export default {
  components: {MemberItem},
  setup(){
    const store = useStore()
    const members = computed(() => store.getters.members)

    onMounted(() => {
      store.dispatch("GetMembers")
    })

    return{
      members
    }
  }
}
</script>