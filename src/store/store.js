import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state() {
    return {
      nationalCounter: {},
      sortedByCity: {},
    };
  },
  mutations: {
    setNationalCounter(state, payload) {
      state.nationalCounter = payload;
    },
    setSortedByCity(state, payload) {
      state.sortedByCity = payload;
    },
  },
  actions: {
    getNationalCounter(context) {
      axios
        .get(
          "https://api.corona-19.kr/korea/?serviceKey=xUMn8d6i7mpuVzcALSGFfKrqEZo2lsRIY"
        )
        .then((result) => {
          context.commit("setNationalCounter", result.data);
        });
    },
    getSortedByCity(context) {
      axios
        .get(
          "https://api.corona-19.kr/korea/country/new/?serviceKey=xUMn8d6i7mpuVzcALSGFfKrqEZo2lsRIY"
        )
        .then((result) => {
          context.commit("setSortedByCity", result.data);
        });
    },
  },
});

export default store;
