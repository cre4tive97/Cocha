<template>
  <div class="card">
    <div class="btn-group"></div>
    <div class="card-chart">
      <vue3-chart-js v-bind="{ ...pieChart }" :key="componentKey" />
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
    let componentKey = ref(0);
    let test = ref([
      {
        backgroundColor: [
          "#A50E15",
          "#016D2C",
          "#00D8FF",
          "#DD1B16",
          "#790277",
          "#983405",
          "#8C96C6",
          "#D0D1E6",
          "#FC9272",
          "#969696",
          "#6AAED6",
          "#78C679",
          "#C994C7",
          "#FFFFD3",
          "#8C5109",
          "#D73026",
          "#FCAD61",
          "#F781BF",
        ],
        data: [],
      },
    ]);

    const pieChart = ref({
      type: "doughnut",
      data: {
        labels: [],
        datasets: test.value,
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
          let counter = [];
          let name = [];
          country.value.forEach((a, i) => {
            // pieChart.value.data.labels.push(a.countryName);
            name[i] = a.countryName;
            counter[i] = parseInt(a.newCase);
          });
          test.value[0].data = counter;
          pieChart.value.data.labels = name;
          console.log(country.value);
          console.log(pieChart.value.data.labels);
          console.log(pieChart.value.data.datasets);
          console.log(test.value);
          componentKey.value++;
        });
    });

    return {
      pieChart,
      country,
      test,
      componentKey,
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
  background: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
}
.card-chart {
  width: 60%;
  max-width: 800px;
}
</style>
