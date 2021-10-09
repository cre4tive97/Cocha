<template>
  <div class="card" v-if="$store.state.sortedByCity.korea !== undefined">
    <div class="card-chart">
      <vue3-chart-js v-bind="{ ...pieChart }" />
    </div>
  </div>
</template>
<script>
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";
import { useStore } from "vuex";
// import { onMounted } from "vue";

export default {
  name: "Card",
  components: {
    Vue3ChartJs,
  },
  setup() {
    const store = useStore();
    const pieChart = {
      type: "pie",
      data: {
        labels: [store.state.sortedByCity.korea],
        datasets: [
          {
            backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
            data: [40, 20, 80, 10],
          },
        ],
      },
    };

    return {
      pieChart,
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
