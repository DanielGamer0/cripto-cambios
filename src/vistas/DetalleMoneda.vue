<template>
  <div class="flex-col">
    <div class="flex justify-center">
      <bounce-loader :color="'#68d391'" :loading="estaCargando" :size="100" />
    </div>
    <template v-if="!estaCargando">
      <div class="flex flex-col sm:flex-row justify-around items-center">
        <div class="flex flex-col items-center">
          <img
            :alt="moneda.name"
            :src="
              `https://static.coincap.io/assets/icons/${moneda.symbol.toLowerCase()}@2x.png`
            "
            class="w-20 h-20 mr-5"
          />
          <h1 class="text-5xl">
            {{ moneda.name }}
            <small class="sm:mr-2 text-gray-500">{{ moneda.symbol }}</small>
          </h1>
        </div>

        <div class="my-10 flex flex-col">
          <ul>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Ranking</b>
              <span>#{{ moneda.rank }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio actual</b>
              <span>{{ moneda.priceUsd | usd }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más bajo</b>
              <span>{{ minimo | usd }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio más alto</b>
              <span>{{ maximo | usd }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Precio Promedio</b>
              <span>{{ promedio | usd }}</span>
            </li>
            <li class="flex justify-between">
              <b class="text-gray-600 mr-10 uppercase">Variación 24hs</b>
              <span>{{ moneda.changePercent24Hr | porcentaje }}</span>
            </li>
          </ul>
        </div>

        <div class="my-10 sm:mt-0 flex flex-col justify-center text-center">
          <button
            v-on:click="alternarConvertidor"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {{ desdeUSD ? `USD a ${moneda.symbol}` : `${moneda.symbol} a USD` }}
          </button>

          <div class="flex flex-row my-5">
            <label class="w-full" for="convertValue">
              <input
                v-model="valorAConvertir"
                class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
                id="convertValue"
                type="number"
                :placeholder="`Valor en ${desdeUSD ? 'USD' : moneda.symbol}`"
              />
            </label>
          </div>
          <span class="text-xl" v-show="valorAConvertir">
            {{ conversion }} {{ desdeUSD ? moneda.symbol : "USD" }}
          </span>
        </div>
      </div>
      <line-chart
        :colors="['blueGrey']"
        :data="historialCoordenado"
        class="my-10"
        v-bind:max="maximo"
        v-bind:min="minimo"
      />
      <h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
      <table>
        <tr
          :key="`${mercado.exchangeId}-${mercado.priceUsd}`"
          class="border-b"
          v-for="mercado in mercados"
        >
          <td>
            <b>{{ mercado.exchangeId }}</b>
          </td>
          <td>{{ mercado.priceUsd | usd }}</td>
          <td>{{ mercado.baseSymbol }} / {{ mercado.quoteSymbol }}</td>
          <td>
            <boton
              :esta-cargando="mercado.estaCargando || false"
              v-if="!mercado.url"
              @al-cliquear="obtenerSitioWeb(mercado)"
            >
              Obtener 🔗
            </boton>
            <a v-else class="hover:underline text-green-600" target="_blanck">
              {{ mercado.url }}
            </a>
          </td>
        </tr>
      </table>
    </template>
  </div>
</template>

<script>
import api from "@/api";
import Boton from "@/components/Boton";

export default {
  name: "DetalleMoneda",
  components: { Boton },
  data() {
    return {
      estaCargando: false,
      moneda: {},
      historial: [],
      mercados: [],
      desdeUSD: true,
      valorAConvertir: null
    };
  },
  computed: {
    historialArreglado() {
      return this.historial.map(hito => parseFloat(hito.priceUsd).toFixed(2));
    },
    minimo() {
      return Math.min(...this.historialArreglado);
    },
    maximo() {
      return Math.max(...this.historialArreglado);
    },
    sumatoria() {
      return this.historialArreglado.reduce(
        (x, y) => parseFloat(x) + parseFloat(y),
        0.0
      );
    },
    promedio() {
      return this.sumatoria / this.historialArreglado.length || 0;
    },
    historialCoordenado() {
      return this.historial.map(hito => [
        hito.date,
        parseFloat(hito.priceUsd).toFixed(2)
      ]);
    },
    conversion() {
      if (!this.valorAConvertir) return 0;
      const resultado = this.desdeUSD
        ? this.valorAConvertir / this.moneda.priceUsd
        : this.valorAConvertir * this.moneda.priceUsd;
      return resultado.toFixed(4);
    }
  },
  watch: {
    $route() {
      this.obtenerMoneda();
    }
  },
  created() {
    this.obtenerMoneda();
  },
  methods: {
    obtenerMoneda() {
      const identificador = this.$route.params.id;
      this.estaCargando = true;
      Promise.all([
        api.obtenerActivo(identificador),
        api.obtenerHistorialDeActivo(identificador),
        api.obtenerMercados(identificador)
      ])
        .then(([activo, historialActivo, mercados]) => {
          this.moneda = activo;
          this.historial = historialActivo;
          this.mercados = mercados;
        })
        .finally(() => (this.estaCargando = false));
    },
    obtenerSitioWeb(mercadoDeCambio) {
      this.$set(mercadoDeCambio, "estaCargando", true);
      return api
        .obtenerCambio(mercadoDeCambio.exchangeId)
        .then(respuesta =>
          this.$set(mercadoDeCambio, "url", respuesta.exchangeUrl)
        )
        .finally(() => this.$set(mercadoDeCambio, "estaCargando", false));
    },
    alternarConvertidor() {
      this.desdeUSD = !this.desdeUSD;
    }
  }
};
</script>

<style scoped>
td {
  padding: 10px;
  text-align: center;
}
</style>
