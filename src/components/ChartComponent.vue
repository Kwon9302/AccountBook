<template>
  <div>
    <Pie :data="data" :options="options"></Pie>
  </div>
</template>

<script setup>
import { Pie } from "vue-chartjs";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { computed } from "vue";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const props = defineProps({
  totalIncome: Number,
  totalExpense: Number,
  profit: Number,
});

const data = computed(() => ({
  labels: ["수입", "지출", "순이익"],
  datasets: [
    {
      data: [props.totalIncome, Math.abs(props.totalExpense), props.profit],
      backgroundColor: ["#f8eba0", "#f76c6c", "#76c7c0"],
      hoverBackgroundColor: ["#f8eb60", "#f74c4c", "#6cc7a0"],
    },
  ],
}));

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "수입/지출/순이익 분포",
    },
  },
};
</script>

<style scoped>
/* 필요한 스타일 추가 */
</style>
