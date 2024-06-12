<template>
    <div>
        <ChartComponent
            :totalIncome="totalIncome"
            :totalExpense="totalExpense"
            :profit="profit"
        ></ChartComponent>
    </div>
    <div class="moneyType label">
        수입 : <span class="incomeAmount"> {{ totalIncome }}</span>
    </div>
    <div class="moneyType label">
        지출 : <span class="expenseAmount"> {{ totalExpense }}</span>
    </div>
    <div class="moneyType label">
        순이익 : <span class="profitAmount"> {{ profit }}</span>
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

.moneyType.label {
    /* 순이익 (text) */
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 1.4;
    text-align: left;

    color: #000000;
}
.moneyType .incomeAmount,
.moneyType .expenseAmount,
.moneyType .profitAmount {
    /* Rectangle 4 (rectangle) */
    background: #f8eba0;

    border: 1px solid #6d6d6d;
    border-radius: 5px;

    /* 내 돈... (text) */
    font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 13px;
    line-height: 1.4;
    text-align: center;

    color: #000000;

    /* - 500,000 (text) */
    font-family: Ink Free;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.4;
    text-align: center;

    color: #72c171;
}
</style>
