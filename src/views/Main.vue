<template>
  <div class="main__container">
    <div class="main__todayCovid"></div>
  </div>
</template>
<script>
import { onMounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "Main",
  setup() {
    let store = useStore();
    onMounted(() => {
      store.dispatch("getNationalCounter");
      store.dispatch("getSortedByCity");
    });
  },
};
</script>

<style></style>
