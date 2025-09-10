import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../page/HomePage.vue";          // your main search page
import RenewalAmount from "../page/Renewal.vue";      // your Renewal component
import Payment from "../page/Payment.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage
  },
  {
    path: "/renewal/:id/:name", // ✅ no trailing slash
    name: "RenewalAmount",
    component: RenewalAmount
  },
  {
    path:"/payment",
    name: "Payment",
    component:Payment
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
