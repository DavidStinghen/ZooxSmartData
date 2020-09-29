import Vue from "vue";
import VueRouter from "vue-router";
import State from "../views/State.vue";
import City from "../views/City.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/estados",
    name: "Estados",
    component: State
  },
  {
    path: "/cidades",
    name: "Cidades",
    component: City
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
