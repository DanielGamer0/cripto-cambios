<template>
  <header class="shadow w-screen">
    <nav>
      <nav class="flex items-center justify-between flex-wrap bg-green-400 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <icono class="mr-2" />
          <router-link
            class="font-semibold text-xl tracking-tight"
            v-bind:to="{ name: 'hogar' }"
            >Cripto¢ambios
          </router-link>
        </div>
        <div
          class="hidden sm:block w-full block flex-grow lg:flex lg:items-center lg:w-auto"
        >
          <div class="text-sm lg:flex-grow">
            <router-link
              class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
              v-bind:key="enlace.title"
              v-bind:to="enlace.to"
              v-for="enlace in enlaces"
              >{{ enlace.title }}
            </router-link>
          </div>
        </div>
      </nav>
    </nav>
  </header>
</template>

<script>
import Icono from "@/components/Icono";

export default {
  name: "Encabezado",
  components: { Icono },
  props: {
    enlaces: {
      type: Array,
      default: () => []
    }
  }
};
</script>
