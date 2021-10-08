<template>
  <div class="main__container">
    <div
      v-if="$store.state.sortedByCity.korea !== undefined"
      class="main__todayCovid"
    >
      <h1 class="main__todayCovid__title">오늘 한국은..</h1>
      <h4 class="main__todayCovid__content">
        신규 확진자 : {{ $store.state.sortedByCity.korea.newCase }}명
      </h4>
    </div>
    <Card />
  </div>
</template>
<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import Card from "../components/Card.vue";

export default {
  name: "Main",
  components: {
    Card,
  },
  setup() {
    let store = useStore();
    onMounted(() => {
      store.dispatch("getNationalCounter");
      store.dispatch("getSortedByCity");
    });
  },
};
</script>

<style>
.main__container {
  margin: 0 1rem;
}
.main__todayCovid {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}
.main__todayCovid__title {
  margin-top: 1rem;
  font-size: 2rem;
  font-weight: 100;
  margin-bottom: 0.5rem;
}
.main__todayCovid__content {
  font-size: 1rem;
  font-weight: 100;
}
</style>
