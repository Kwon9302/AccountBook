<template>
  <div class="subcontainer">
    <div id="subtitle">거래 요약</div>
    <hr />
    <div class="filter-container">
      <select v-model="filterYear" class="styled-select">
        <option value="" disabled>년도</option>
        <option v-for="y in years" :key="y" :value="y">{{ y }}년</option>
      </select>
      <select v-model="filterDate" class="styled-select">
        <option value="" disabled>월</option>
        <option v-for="m in 12" :key="m" :value="m">{{ m }}월</option>
      </select>
    </div>

    <div class="chart-container">
      <ChartComponent
        :totalIncome="totalIncome"
        :totalExpense="totalExpense"
        :profit="profit"
      ></ChartComponent>
    </div>
    <div class="moneyType label">
      수입
      <span class="amount incomeAmount"> {{ formattedTotalIncome }}</span>
    </div>
    <div class="moneyType label">
      지출
      <span class="amount expenseAmount"> {{ formattedTotalExpense }}</span>
    </div>
    <div class="moneyType label">
      순이익 <span class="amount profitAmount"> {{ formattedProfit }}</span>
    </div>
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

// , 포맷팅 함수(JavaScript 'toLacaleString'메서드 사용)
const formatCurrency = (amount) => {
  return amount.toLocaleString("ko-KR", { style: "currency", currency: "KRW" });
  //   return amount.toLocaleString("ko-KR", { style: "decial" }); 원화표시 없앨때 사용
};

// 포맷팅된 금액 반환
const formattedTotalIncome = computed(() => formatCurrency(totalIncome.value));
const formattedTotalExpense = computed(() =>
  formatCurrency(totalExpense.value)
);
const formattedProfit = computed(() => formatCurrency(profit.value));
</script>

<style scoped>
.chart-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

#subtitle {
  margin-bottom: 8px; /* 거래요약과 밑줄 사이 여백 10px */
  margin-left: 10px;
}
hr {
  margin-bottom: 13px; /* 아래쪽 여백  */
}

.filter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  margin-right: 10px;
}

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
/* .styled-select option {
  background-color: #f8eba0 !important; /* 드롭다운 옵션 배경색 */
/* color: #000; 드롭다운 옵션 글자색 */
/* }  */
.moneyType.label {
  /* font-family: Inter; */
  /* font-weight: 500; */
  font-size: 18px;
  line-height: 1.4;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  margin-left: 20px;
  color: #000000;
  /* margin-right: 20px; */
  /* label과 amount 사이의 여백 설정 */
}

.moneyType .amount {
  /* 금액 공통 스타일 */
  background: #f8eba0;
  border: 1px solid #6d6d6d;
  border-radius: 5px;

  /* font-family: Ink Free; */
  /* font-weight: 600; */
  font-size: 18px;
  line-height: 1.4;
  text-align: right;
  padding-right: 8px; /* 글자와 오른쪽 여백 */
  margin-right: 40px;
  /* margin-left: 20px; */
  /* label과 amount 사이의 여백 설정 */
  display: inline-block; /* 가로 크기를 조절하기 위해 block 또는 inline-block으로 설정 */
  width: 200px; /* 원하는 가로 크기 (픽셀 단위) */
}

/* 개별 색상 */
.moneyType .incomeAmount {
  color: #72c171; /* 수입 금액 색상 */
}

.moneyType .expenseAmount {
  color: #f76c6c; /* 지출 금액 색상 */
}

.moneyType .profitAmount {
  color: #76c7c0; /* 순이익 금액 색상 */
}
</style>
