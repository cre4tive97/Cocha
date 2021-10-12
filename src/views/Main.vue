<template>
  <div class="main__container">
    <Card />
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import Card from "../components/Card.vue";
import axios from "axios";

export default {
  name: "Main",
  components: {
    Card,
  },
  setup() {
    // let store = useStore();

    let korea = ref({});
    onMounted(() => {
      axios
        .get(
          "https://api.corona-19.kr/korea/country/new/?serviceKey=xUMn8d6i7mpuVzcALSGFfKrqEZo2lsRIY"
        )
        .then((result) => {
          korea.value = result.data.korea;
        });
    });
    return {
      korea,
    };
  },
};
</script>

<style>
.main__container {
  margin: 0 1rem;
  display: flex;
}
</style>
