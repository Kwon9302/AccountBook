<script setup>
import { RouterLink, RouterView } from "vue-router";
import TotalList from "./components/TotalList.vue";
import HomeView from "./components/HomeView.vue";
import TradeList from "./components/TradeList.vue";
</script>

<template>
    <div>
        <!-- <TotalList /> -->

        <nav>
            <router-link to="/">홈</router-link>
            &nbsp;
            <router-link to="/list">거래 리스트</router-link>
            &nbsp;
            <router-link to="/total">지표</router-link>
        </nav>
        <RouterView />

        <!-- <HomeView /> -->
    </div>
</template>

<script></script>

<style></style>
