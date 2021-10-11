<template>
  <div class="card">
    <div class="card-chart">
      <vue3-chart-js v-bind="{ ...pieChart }" :key="componentKey" />
    </div>
    <button class="chart__setting" @click="sidebarState = !sidebarState">
      <i class="fas fa-cog"></i>
    </button>
    <transition name="sidebarAnimation">
      <Sidebar
        v-show="sidebarState"
        :datasets="datasets"
        :country="country"
        :selectedRegionData="selectedRegionData"
        @newCase="sortedByNewCase"
        @totalCase="sortedByTotalCase"
        @recovered="sortedByRecovered"
        @death="sortedByDeath"
        @regionSelect="regionSelect"
      />
    </transition>
  </div>
</template>
<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import Sidebar from "./Sidebar.vue";
import axios from "axios";
// import { useStore } from "vuex";
import { ref, onMounted } from "vue";

export default {
  name: "Card",
  components: {
    Vue3ChartJs,
    Sidebar,
  },
  setup() {
    // const store = useStore();
    let country = ref([]);
    let componentKey = ref(0);
    let sidebarState = ref(false);
    let selectedRegionData = ref([]);
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

    // sort buttons
    let sortedByNewCase = () => {
      datasets.value[0].data = [];
      country.value.forEach((a) => {
        datasets.value[0].data.push(stringNumberToInt(a.newCase));
      });
      componentKey.value++;
    };

    let sortedByTotalCase = () => {
      datasets.value[0].data = [];
      country.value.forEach((a) => {
        datasets.value[0].data.push(stringNumberToInt(a.totalCase));
      });
      componentKey.value++;
    };

    let sortedByRecovered = () => {
      datasets.value[0].data = [];
      country.value.forEach((a) => {
        datasets.value[0].data.push(stringNumberToInt(a.recovered));
      });
      componentKey.value++;
    };

    let sortedByDeath = () => {
      datasets.value[0].data = [];
      country.value.forEach((a) => {
        datasets.value[0].data.push(stringNumberToInt(a.death));
      });
      componentKey.value++;
    };

    let regionSelect = (a) => {
      selectedRegionData.value.push(a);
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
            counter[i] = stringNumberToInt(a.newCase);
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
      sortedByRecovered,
      sortedByDeath,
      sidebarState,
      regionSelect,
      selectedRegionData,
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
  /* background: #eee; */
  display: flex;
  flex-direction: column;
  align-items: center;
  /* box-shadow: 0 0 25px rgba(0, 0, 0, 0.3); */
}
.card-chart {
  width: 60%;
  min-width: 320px;
}
.chart__setting {
  position: fixed;
  bottom: 1rem;
  left: 1rem;
  border-style: none;
  font-size: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 2.5rem;
  height: 2.5rem;
  color: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  transition: all 0.3s;
}
.chart__setting:hover {
  transform: scale(1.1);
  color: black;
  cursor: pointer;
}
.sidebarAnimation-enter-from {
  opacity: 0;
  transform: translateX(-200px);
}
.sidebarAnimation-enter-active,
.sidebarAnimation-leave-active {
  transition: all 0.5s;
}
.sidebarAnimation-enter-to {
  opacity: 1;
  transform: translateX(0px);
}
.sidebarAnimation-leave-to {
  opacity: 0;
  transform: translateX(-200px);
}
</style>
