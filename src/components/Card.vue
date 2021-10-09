<template>
  <div class="card">
    <div class="card-chart">
      <vue3-chart-js v-bind="{ ...pieChart }" />
    </div>
  </div>
</template>
<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import axios from "axios";
// import { useStore } from "vuex";
import { ref, onMounted } from "vue";

export default {
  name: "Card",
  components: {
    Vue3ChartJs,
  },

  setup() {
    // const store = useStore();
    let country = ref([]);

    const pieChart = ref({
      type: "pie",
      data: {
        labels: [],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [1],
          },
        ],
      },
    });
    onMounted(() => {
      axios
        .get(
          "https://api.corona-19.kr/korea/country/new/?serviceKey=xUMn8d6i7mpuVzcALSGFfKrqEZo2lsRIY"
        )
        .then((result) => {
          let countries = [
            "seoul",
            "busan",
            "daegu",
            "incheon",
            "gwangju",
            "daejeon",
            "ulsan",
            "sejong",
            "gyeonggi",
            "gangwon",
            "chungbuk",
            "chungnam",
            "jeonbuk",
            "jeonnam",
            "gyeongbuk",
            "gyeongnam",
            "jeju",
            "quarantine",
          ];
          for (let i = 0; i < countries.length; i++) {
            country.value.push(result.data[countries[i]]);
          }
          console.log(country.value);
          country.value.forEach((a) => {
            pieChart.value.data.labels.push(a.countryName);
          });
          pieChart.value.data.datasets[0].data.push(2);
        });
    });

    return {
      pieChart,
      country,
    };
  },
};
</script>
<style>
.card {
  width: 100%;
  height: 100%;
  padding: 1rem 0;
  border-radius: 1rem;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
}
.card-chart {
  max-width: 50%;
}
</style>
