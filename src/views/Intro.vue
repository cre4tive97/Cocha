<template>
  <div class="intro" :class="{ outro: getStartedState }">
    <div class="intro__container">
      <div class="intro__todayCovid">
        <h1 class="intro__todayCovid__title">오늘 한국은..</h1>
        <h4 class="intro__todayCovid__content">
          신규 확진자 : {{ korea.newCase }}명
        </h4>
        <button class="intro__todayCovid__btn" @click="getStarted">
          차트로 보기
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
  name: "Intro",

  setup() {
    let router = useRouter();
    let korea = ref({});
    let getStartedState = ref(false);
    let getStarted = () => {
      getStartedState.value = true;
      setTimeout(() => {
        router.push("/chart");
      }, 500);
    };
    onMounted(() => {
      axios
        .get(
          "https://api.corona-19.kr/korea/country/new/?serviceKey=xUMn8d6i7mpuVzcALSGFfKrqEZo2lsRIY"
        )
        .then((result) => {
          korea.value = result.data.korea;
          console.log(korea.value);
        });
    });

    return {
      korea,
      getStartedState,
      getStarted,
    };
  },
};
</script>
<style>
.intro {
  width: 100%;
  position: absolute;
  top: 0px;
  height: 100vh;
  background-image: linear-gradient(#025dcb, #3e8de8);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s;
}
.outro {
  opacity: 0;
}
.intro__todayCovid {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  color: white;
}
.intro__todayCovid__title {
  margin-top: 1rem;
  font-size: 6rem;
  font-weight: 100;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}
.intro__todayCovid__content {
  font-size: 2rem;
  font-weight: 100;
  margin-bottom: 1rem;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}
.intro__todayCovid__btn {
  border-style: none;
  color: white;
  background: #004da5;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  padding: 4px 8px;
  font-size: 2rem;
  font-weight: 100;
  border-radius: 4px;
  transition: all 0.2s;
}
.intro__todayCovid__btn:hover {
  cursor: pointer;
  background: #0e396b;
}

@media screen and (max-width: 550px) {
  .intro__todayCovid__title {
    margin-top: 1rem;
    font-size: 3rem;
    font-weight: 100;
    margin-bottom: 1rem;
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }
  .intro__todayCovid__content {
    font-size: 1.2rem;
    font-weight: 100;
    margin-bottom: 1rem;
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }
  .intro__todayCovid__btn {
    border-style: none;
    color: white;
    background: #004da5;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
    padding: 4px 8px;
    font-size: 1.2rem;
    font-weight: 100;
    border-radius: 4px;
    transition: all 0.2s;
  }
}
</style>
