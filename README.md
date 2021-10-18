<div align="center">
<img src="./public/logo.png", width="250" height="250">

![vue](https://img.shields.io/badge/Vue.js-%5E3.0.0-green)

Cocha - 차트로 보는 코로나 현황

[Demo](https://cre4tive97.github.io/Cocha/#/)

</div>

## 🧷 Features

- [x] Consist of Vue3, vue-router, axios 💚
- [x] Interactive Chart by Chart.js 📊
- [x] Support variable sort functions 🗂
- [x] Responsive design 🖥

## 📊 Chart Features

- [x] Sort buttons support New case, Total case, Recovered, Death
- [x] Select by region name
- [x] Real-time reflection with selected region
- [ ] Switchable chart

## 🧾 Features/WIL Description

- Vue3의 Composition API를 다루는 전반적인 방법과, JSON 데이터의 효율적 시각화에 대해서 스스로 공부했습니다.
- Vue3의 [공식 문서](https://v3.ko.vuejs.org/)를 참조해 제작했습니다.
- 데이터를 다루면서 자료구조와 알고리즘 공부의 필요성을 뼈저리게 느꼈습니다.

#### Chart

- 굿바이코로나 API를 사용해 제작되었습니다. [문서](https://github.com/dhlife09/Corona-19-API)
- [Vue3 ChartJS Wrapper](https://github.com/J-T-McC/vue3-chartjs)를 사용했습니다.
- 정렬이나 지역을 선택/해제 하면 차트만 Re-rendering 되게끔 componentKey로 관리했습니다.

#### Sidebar sort buttons

- 중복되는 코드들을 함수화해서 코드를 조금 더 깨끗하게 관리했습니다.
- 정렬 기능에 예상치 못 한 버그들이 많이 발생하여, 그 때마다 버그의 발생 조건을 기록하고 해결하였습니다.
- 원본 데이터 배열 참조 => 가변 데이터 배열 변경 처럼 이상적인 구조로 개발 하고 싶었습니다.**_(만 실패했습니다. 추후 개선 필요한 코드 매우 많음)_**

## ⛏ Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
