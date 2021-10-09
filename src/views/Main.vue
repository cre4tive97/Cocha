<template>
  <div class="main__container">
    <div class="main__todayCovid">
      <h1 class="main__todayCovid__title">오늘 한국은..</h1>
      <h4 class="main__todayCovid__content">
        신규 확진자 : {{ korea.newCase }}명
      </h4>
    </div>
    <Card />
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
// import { useStore } from "vuex";
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
