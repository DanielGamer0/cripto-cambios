import Vue from "vue";
import App from "./App.vue";
import "@/assets/css/tailwind.css";
import enrutador from "@/enrutador";
import { filtroDolar, filtroPorcentaje } from "@/filtros";
import { VueSpinners } from "@saeris/vue-spinners";
import Chartkick from "vue-chartkick";
import Chart from "chart.js";

Vue.config.productionTip = false;
Vue.filter("usd", filtroDolar);
Vue.filter("porcentaje", filtroPorcentaje);
Vue.use(VueSpinners);
Vue.use(Chartkick.use(Chart));

new Vue({
  router: enrutador,
  render: h => h(App)
}).$mount("#app");
