<template>
  <div class="card">
    <div class="btn-group">
      <button class="sortedByNewCase" @click="sortedByNewCase">
        신규 확진자
      </button>
      <button class="sortedByTotalCase" @click="sortedByTotalCase">
        전체 확진자
      </button>
      <button class="sortedByRecovered">전체 회복자</button>
      <button class="sortedByDeath">전체 사망자</button>
    </div>
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
    let datasets = ref([
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
      },
    ]);

    const pieChart = ref({
      type: "doughnut",
      data: {
        labels: [],
        datasets: datasets.value,
      },
    });

    console.log(country.value);
    let sortedByNewCase = () => {
      datasets.value[0].data = [];
      country.value.forEach((a) => {
        datasets.value[0].data.push(stringNumberToInt(a.newCase));
      });
      console.log(datasets.value);
      componentKey.value++;
    };
    let sortedByTotalCase = () => {
      datasets.value[0].data = [];
      country.value.forEach((a) => {
        datasets.value[0].data.push(stringNumberToInt(a.totalCase));
      });
      console.log(datasets.value);
      componentKey.value++;
    };

    let stringNumberToInt = (stringNumber) => {
      return parseInt(stringNumber.replace(/,/g, ""));
    };

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
            name[i] = a.countryName;
            counter[i] = parseInt(a.newCase);
          });
          datasets.value[0].data = counter;
          pieChart.value.data.labels = name;
          componentKey.value++;
        });
    });

    return {
      pieChart,
      country,
      componentKey,
      datasets,
      stringNumberToInt,
      sortedByNewCase,
      sortedByTotalCase,
    };
  },
};
</script>
<style>
.card {
  width: 100%;
  height: 100%;
  margin-bottom: 1rem;
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
