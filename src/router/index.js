import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import AddPage from '../components/AddPage.vue';
import HistoryPage from '../components/HistoryPage.vue';
import SummaryPage from '../components/SummaryPage.vue';
import CalendarPage from '../components/CalendarPage.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/history',
      name: 'history',
      component: HistoryPage,
    },

    {
      path: '/add',
      name: 'addPage',
      component: AddPage,
    },

    {
      path: '/summary',
      name: 'summaryPage',
      component: SummaryPage,
    },
    {
      path: '/calendar',
      name: 'CalendarPage',
      component: CalendarPage,
    },
  ],
});

export default router;
