import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../components/HomeView.vue";
import TotalList from "../components/TotalList.vue";
import TradeList from "../components/TradeList.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: HomeView,
        },
        {
            path: "/list",
            name: "tradeList",
            component: TradeList,
        },

        {
            path: "/total",
            name: "totalList",
            component: TotalList,
        },
    ],
});

export default router;
