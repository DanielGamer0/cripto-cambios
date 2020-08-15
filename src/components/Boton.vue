<template>
  <!-- v-on:click="cliquearBoton" -->
  <button
    @click="cliquearBoton"
    class="bg-transparent hover:bg-green-500
    text-green-700 font-semibold hover:text-white py-2 px-2 border
    border-green-500 hover:border-transparent rounded"
  >
    <beat-loader :loading="estaCargando" :color="'#68d391'" :size="8" />
    <div v-show="!estaCargando"><slot /></div>
  </button>
</template>

<script>
export default {
  name: "Boton",
  props: {
    estaCargando: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    cliquearBoton() {
      this.$emit("al-cliquear");
    }
  }
};
</script>
