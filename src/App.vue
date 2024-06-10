<script setup>
import { RouterLink, RouterView } from "vue-router";
import TotalList from "./components/TotalList.vue";
import HomeView from "./components/HomeView.vue";
</script>

<template>
    <div>
        <HomeView />
        <TotalList />

        <!-- <nav><<router-link to="/"></router-link></nav>
        <RouterView /> -->
    </div>
</template>

<script></script>

<style></style>
