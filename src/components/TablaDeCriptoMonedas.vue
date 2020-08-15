<template>
  <table>
    <thead>
      <tr class="bg-gray-100 border-b-2 border-gray-400">
        <th></th>
        <th :class="{ arriba: this.orden === 1, abajo: this.orden === -1 }">
          <span @click="alternarOrden" class="underline cursor-pointer"
            >Ranking</span
          >
        </th>
        <th>Nombre</th>
        <th>Precio</th>
        <th>Cap. de Mercado</th>
        <th>Variación 24hs</th>
        <td class="hidden sm:block">
          <input
            class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
            id="filtro-tabla"
            placeholder="Buscar..."
            type="text"
            v-model="filtro"
          />
        </td>
      </tr>
    </thead>
    <tbody>
      <tr
        class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
        v-bind:key="moneda.id"
        v-for="moneda in monedasFiltradas"
      >
        <td>
          <img
            :src="
              `https://static.coincap.io/assets/icons/${moneda.symbol.toLowerCase()}@2x.png`
            "
            class="w-6 h-6"
            v-bind:alt="moneda.name"
          />
        </td>
        <td>
          <b>#{{ moneda.rank }}</b>
        </td>
        <td>
          <router-link
            class="hover:underline text-green-600"
            v-bind:to="{ name: 'detalle-moneda', params: { id: moneda.id } }"
          >
            {{ moneda.name }}
          </router-link>
          <small class="ml-1 text-gray-500">{{ moneda.symbol }}</small>
        </td>
        <td>{{ moneda.priceUsd | usd }}</td>
        <td>{{ moneda.marketCapUsd | usd }}</td>
        <td
          :class="
            moneda.changePercent24Hr.includes('-')
              ? 'text-red-600'
              : 'text-green-600'
          "
        >
          {{ moneda.changePercent24Hr | porcentaje }}
        </td>
        <td class="hidden sm:block">
          <boton @al-cliquear="irALaMoneda(moneda.id)">
            Detalle
          </boton>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Boton from "@/components/Boton";

export default {
  name: "TablaDeCriptoMonedas",
  components: { Boton },
  data() {
    return {
      filtro: "",
      orden: 1
    };
  },
  props: {
    criptoMonedas: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    monedasFiltradas() {
      const ordenAlterno = this.orden === 1 ? -1 : 1;
      return this.criptoMonedas
        .filter(
          moneda =>
            moneda.symbol.toLowerCase().includes(this.filtro.toLowerCase()) ||
            moneda.name.toLowerCase().includes(this.filtro.toLowerCase())
        )
        .sort((a, b) => {
          if (parseInt(a.rank) > parseInt(b.rank)) return this.orden;
          return ordenAlterno;
        });
    }
  },
  methods: {
    irALaMoneda(identificacion) {
      this.$router.push({
        name: "detalle-moneda",
        params: { id: identificacion }
      });
    },
    alternarOrden() {
      this.orden = this.orden === 1 ? -1 : 1;
    }
  }
};
</script>

<style scoped>
.arriba::before {
  content: "👆";
}

.abajo::before {
  content: "👇";
}

td {
  padding: 20px 0px;
  font-size: 0.6rem;
  text-align: center;
}

th {
  padding: 5px;
  font-size: 0.6rem;
}

@media (min-width: 640px) {
  td,
  th {
    padding: 20px;
    font-size: 1rem;
  }

  th {
    padding: 12px;
  }
}
</style>
