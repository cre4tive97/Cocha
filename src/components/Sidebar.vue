<template>
  <div class="sidebar">
    <div class="sidebar__sort">
      <h1 class="sidebar__sort__title" @click="sortBtnState = !sortBtnState">
        정렬
      </h1>
      <div class="sidebar__sortBtnGroup" v-show="sortBtnState">
        <button class="btn" @click="$emit('newCase')">
          신규 확진자
        </button>
        <button class="btn" @click="$emit('totalCase')">
          전체 확진자
        </button>
        <button class="btn" @click="$emit('recovered')">
          전체 회복자
        </button>
        <button class="btn" @click="$emit('death')">
          전체 사망자
        </button>
      </div>
    </div>
    <div class="sidebar__region">
      <h1
        class="sidebar__region__title"
        @click="regionBtnState = !regionBtnState"
      >
        지역
      </h1>
      <div class="sidebar__region__selected" v-show="regionBtnState">
        <p>선택됨 :</p>
        <div
          class="sidebar__region__content__name"
          v-for="(a, i) in selectedRegionData"
          :key="i"
        >
          <div
            class="sidebar__region__content__color"
            :style="{
              backgroundColor: selectedRegionData[i].color,
            }"
          ></div>
          {{ a.name }}
        </div>
      </div>
      <div class="sidebar__region__content" v-show="regionBtnState">
        <div
          class="sidebar__region__content__name"
          v-for="(a, i) in country"
          :key="i"
          @click="regionClick"
        >
          <div
            class="sidebar__region__content__color"
            :style="{ backgroundColor: datasets[0].backgroundColor[i] }"
          ></div>
          {{ a.countryName }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, toRefs } from "vue";
export default {
  name: "Sidebar",
  emits: ["regionSelect", "newCase", "totalCase", "recovered", "death"],
  props: {
    country: Array,
    datasets: Array,
    selectedRegionData: Array,
  },
  setup(props, { emit }) {
    let sortBtnState = ref(false);
    let regionBtnState = ref(false);

    let { country, datasets } = toRefs(props);

    console.log(country.value);
    console.log(datasets.value);

    let regionClick = (e) => {
      emit("regionSelect", {
        name: e.currentTarget.childNodes[1].data.trim(),
        color: e.currentTarget.childNodes[0].style.backgroundColor.trim(),
      });
    };

    return {
      sortBtnState,
      regionBtnState,
      regionClick,
    };
  },
};
</script>

<style>
.sidebar {
  position: fixed;
  bottom: 4rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(16px);
  width: 30%;
  max-width: 400px;
  min-width: 200px;
  padding: 1rem;
  border-radius: 0.5rem;
  z-index: 5;
}
.sidebar__sort {
  display: flex;
  flex-direction: column;
}
.sidebar__sort__title,
.sidebar__region__title {
  font-size: 1.5rem;
  font-weight: 600;
}
.sidebar__sort__title:hover,
.sidebar__region__title:hover {
  cursor: pointer;
}
.sidebar__sort {
  margin-bottom: 1rem;
}
.sidebar__sort,
.sidebar__region {
  color: white;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0.5rem;
  padding: 0.5rem;
}
.sidebar__sortBtnGroup {
  display: flex;
  flex-direction: column;
}
.btn {
  border-style: none;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.4);
  margin: 4px 0;
  transition: background 0.3s;
}
.btn:hover {
  cursor: pointer;
  background: rgba(0, 0, 0, 0.8);
}
.sidebar__region__content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
.sidebar__region__content__name {
  padding: 4px 8px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  margin: 4px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  transition: background 0.3s;
}
.sidebar__region__content__name:hover {
  cursor: pointer;
  background: rgba(0, 0, 0, 0.8);
}
.sidebar__region__content__color {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  margin-right: 4px;
}
.sidebar__region__selected {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}
</style>
