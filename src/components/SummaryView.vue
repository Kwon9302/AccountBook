<template>
  <div>
    <select v-model="filterYear" class="styled-select">
      <option value="" disabled>연도 선택</option>
      <option v-for="y in years" :key="y" :value="y">{{ y }}년</option>
    </select>
    <select v-model="filterDate" class="styled-select">
      <option value="" disabled>월 선택</option>
      <option v-for="m in 12" :key="m" :value="m">{{ m }}월</option>
    </select>
    <div>
        <select v-model="filterDate">
            <option value="" disabled>월 선택</option>
            <option v-for="m in 12" :key="m" :value="m">{{ m }}월</option>
        </select>
        <div>
            <img
                src="https://wikidocs.net/images/page/92114/pie_chart_00.png "
                alt="차트"
            />
        </div>
        <div>수입 : {{ totalIncome }}</div>
        <div>지출 : {{ totalExpense }}</div>
        <div>순이익 : {{ profit }}</div>
      <ChartComponent
        :totalIncome="totalIncome"
        :totalExpense="totalExpense"
        :profit="profit"
      ></ChartComponent>
    </div>

    <div>수입 : {{ totalIncome }}</div>
    <div>지출 : {{ totalExpense }}</div>
    <div>순이익 : {{ profit }}</div>
  </div>
</template>

<script setup>
import { useMoneyManageStore } from "@/stores/counter";
import { ref, onMounted, computed } from "vue";
import ChartComponent from "@/components/ChartComponent.vue";

const filterYear = ref("");
const filterDate = ref("");
const summaryManage = useMoneyManageStore();

onMounted(() => {
  summaryManage.fetchMoneyManageList();
});

const { states, fetchMoneyManageList } = summaryManage;

// 연도 목록 생성 (예: 최근 5년)
const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

const filteredList = computed(() => {
  return states.manageList.filter((item) => {
    const matchesYear = filterYear.value
      ? item.year === parseInt(filterYear.value)
      : true;
    const matchesMonth = filterDate.value
      ? item.month === parseInt(filterDate.value)
      : true;
    return matchesYear && matchesMonth;
  });
});

// 수익 계산
const totalIncome = computed(() => {
  return filteredList.value
    .filter((item) => item.amount > 0)
    .reduce((acc, item) => acc + item.amount, 0);
});

// 지출 계산
const totalExpense = computed(() => {
  return filteredList.value
    .filter((item) => item.amount < 0)
    .reduce((acc, item) => acc + item.amount, 0);
});

// 순이익 계산
const profit = computed(() => {
  return totalIncome.value + totalExpense.value; // 지출이 음수이므로 더하면 됨
});
</script>

<style scoped>
.styled-select {
  background: #f8eba0;
  border: 0.5869231224060059px solid #6d6d6d;
  border-radius: 5.384615898132324px;
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 1.4;
  text-align: center;
  color: #828282;
  padding: 4px; /* padding 추가 */
  margin-right: 10px; /* 선택 버튼 간 간격 추가 */
}

.styled-select option {
  background: #fff; /* 드롭다운 옵션 배경색 */
  color: #000; /* 드롭다운 옵션 글자색 */
}
</style>
