<template>
  <div class="card">
    <h2 class="card__chartName">
      {{ Object.values(sortName[sortCounter]).toString() }}
    </h2>
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
        @regionSelect="regionManage"
        @selectedRegionClick="selectedRegionClick"
        @removeAllClick="removeAllClick"
      />
    </transition>
  </div>
</template>
<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import Sidebar from "./Sidebar.vue";
import axios from "axios";
// import { useStore } from "vuex";
import { ref, onMounted, watch } from "vue";

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
    let sortName = ref([
      { newCase: "신규 확진자" },
      { totalCase: "전체 확진자" },
      { recovered: "전체 회복자" },
      { death: "전체 사망자" },
    ]);
    let sortCounter = ref(0);
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
    let selectedDatasets = ref([
      {
        backgroundColor: [],
        data: [],
      },
    ]);

    watch(
      selectedRegionData,
      () => {
        if (selectedRegionData.value.length === 0) {
          let newName = [];
          // let newCounter = []
          country.value.forEach((a) => {
            newName.push(a.countryName);
            pieChart.value.data.datasets = datasets.value;
          });
          pieChart.value.data.labels = newName;
        } else {
          pieChart.value.data.labels = [];
          selectedDatasets.value[0].backgroundColor = [];
          selectedDatasets.value[0].data = [];
          selectedRegionData.value.forEach((a) => {
            pieChart.value.data.labels.push(a.name);
            selectedDatasets.value[0].backgroundColor.push(a.color);
            selectedDatasets.value[0].data.push(
              datasets.value[0].data[a.number]
            );
          });
          pieChart.value.data.datasets = selectedDatasets.value;
        }
      },
      { deep: true }
    );

    const pieChart = ref({
      type: "doughnut",
      data: {
        labels: [],
        datasets: datasets.value,
      },
    });

    // sort buttons

    let manageSortFunction = (sortcase, number) => {
      if (selectedRegionData.value.length === 0) {
        datasets.value[0].data = [];
        country.value.forEach((a) => {
          datasets.value[0].data.push(stringNumberToInt(a[sortcase]));
        });
      } else {
        let Counter = [];
        selectedRegionData.value.forEach((a) => {
          Counter.push(stringNumberToInt(country.value[a.number][sortcase]));
        });
        selectedDatasets.value[0].data = [...Counter];
      }
      sortCounter.value = number;
      componentKey.value++;
    };

    let sortedByNewCase = () => manageSortFunction("newCase", 0);
    let sortedByTotalCase = () => manageSortFunction("totalCase", 1);
    let sortedByRecovered = () => manageSortFunction("recovered", 2);
    let sortedByDeath = () => manageSortFunction("death", 3);

    // select & remove function

    let regionRemove = (payload) => {
      let filteredRegionData = selectedRegionData.value.filter(
        (el) => el.name !== payload.name
      );
      selectedRegionData.value = filteredRegionData;
    };

    let regionManage = (payload) => {
      let result = selectedRegionData.value.find(
        (el) => el.name === payload.name
      );
      if (result === undefined) {
        selectedRegionData.value.push(payload);
      } else {
        regionRemove(payload);
      }
      componentKey.value++;
    };

    let selectedRegionClick = (payload) => {
      let result = selectedRegionData.value.find(
        (el) => el.name === payload.name
      );
      if (result !== undefined) {
        regionRemove(payload);
      }
      componentKey.value++;
    };

    let removeAllClick = () => {
      selectedRegionData.value = [];
      manageSortFunction(
        Object.keys(sortName.value[sortCounter.value]).toString(),
        sortCounter.value
      );
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
      regionManage,
      selectedRegionData,
      sortName,
      sortCounter,
      selectedDatasets,
      manageSortFunction,
      selectedRegionClick,
      regionRemove,
      removeAllClick,
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
  display: flex;
  flex-direction: column;
  align-items: center;
}
.card__chartName {
  font-size: 1.5rem;
  font-weight: 500;
}
.card-chart {
  width: 100%;
  min-width: 280px;
  max-width: 80vh;
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
