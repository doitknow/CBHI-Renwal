import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../page/HomePage.vue";          // your main search page
import RenewalAmount from "../page/Renewal.vue";      // your Renewal component
import Payment from "../page/Payment.vue";
import Verification from "../page/verification.vue";
import PaymentSucess from "../page/PaymentSucess..vue";
import PaymentInitate from "../page/PaymentInitate.vue";
import PaymentFailure from "../page/PaymentFailure.vue";

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
  },
  {
    path: "/verify",
    name: "verification",
    component: Verification
  },
  {
    path:"/success",
    name:"paymentSuccess",
    component:PaymentSucess
  },
  {
    path:'/payment/initate',
    name:"paymentInitation",
    component:PaymentInitate
  },
  { path: "/payment/failure", 
    name: "PaymentFailure", 
    component: PaymentFailure }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
