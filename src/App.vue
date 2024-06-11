<script setup>
import { RouterLink, RouterView } from 'vue-router';
import TotalList from './components/TotalList.vue';
import HomeView from './components/HomeView.vue';
import TradeList from './components/TradeList.vue';
import SummaryView from './components/SummaryView.vue';

import { useMoneyManageStore } from '@/stores/counter';
import { ref, onMounted, computed } from 'vue';

const toggleManage = useMoneyManageStore();

onMounted(() => {
  toggleManage.fetchMoneyManageList();
});

const isMenuOpen = computed(() => toggleManage.states.isMenuOpen);
const toggleMenu = toggleManage.toggleMenu;
</script>

<template>
  <div id="app">
    <div class="container">
      <nav class="navbar">
        <div class="menu">
          <router-link to="/main">
            <img src="@/asset/img.svg" alt="Home" class="icon"
          /></router-link>
          <img
            src="@/asset/hamburger.svg"
            alt="Menu"
            class="hamburger"
            @click="toggleMenu"
          />
        </div>
        <div :class="{ 'menu-content': true, show: isMenuOpen }">
          <router-link to="/">새로운 거래</router-link>
          &nbsp;
          <router-link to="/list">거래 리스트</router-link>
          &nbsp;
          <router-link to="/total">지표</router-link>
          &nbsp;
          <router-link to="/summary">요약(차트)</router-link>
        </div>
      </nav>
      <RouterView />
    </div>
  </div>
</template>

<style></style>
