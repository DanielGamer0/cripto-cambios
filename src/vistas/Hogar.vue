<template>
  <div>
    <bounce-loader :loading="estaCargando" :color="'#68d391'" :size="100" />
    <tabla-de-cripto-monedas
      v-if="!estaCargando"
      v-bind:cripto-monedas="monedas"
    />
  </div>
</template>

<script>
import TablaDeCriptoMonedas from "@/components/TablaDeCriptoMonedas";
import api from "@/api";

export default {
  name: "Hogar",
  components: { TablaDeCriptoMonedas },
  data() {
    return {
      monedas: [],
      estaCargando: false
    };
  },
  created() {
    this.estaCargando = true;
    api
      .obtenerActivos()
      .then(activos => (this.monedas = activos))
      .finally(() => (this.estaCargando = false));
  }
};
</script>
