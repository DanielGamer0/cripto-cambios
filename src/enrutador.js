import Vue from "vue";
import Router from "vue-router";
import Hogar from "@/vistas/Hogar";
import AcercaDe from "@/vistas/AcercaDe";
import Error from "@/vistas/Error";
import DetalleMoneda from "@/vistas/DetalleMoneda";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "hogar",
      component: Hogar
    },
    {
      path: "/acerca-de",
      name: "acerca-de",
      component: AcercaDe
    },
    {
      path: "/moneda/:id",
      name: "detalle-moneda",
      component: DetalleMoneda
    },
    {
      path: "*",
      name: "error",
      component: Error
    }
  ]
});
