import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/addcard",
    name: "Add Card",
    component: () => import("../views/AddCard.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
