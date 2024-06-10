<template>
    <div>
        <!-- 내역 -->
        <h1>내역 페이지</h1>
        <!-- 필터 입력 필드 -->
        <!-- <input v-model="filterCategory" placeholder="카테고리 필터" /> -->

        <!-- <input v-model="filterDate" type="number" placeholder="날짜 필터" /> -->
        <select v-model="filterDate">
            <option value="" disabled>월 선택</option>
            <option v-for="m in 12" :key="m" :value="m">{{ m }}월</option>
        </select>

        <select v-model="filterAmountType">
            <option value="all">전체</option>
            <option value="income">수입</option>
            <option value="expense">지출</option>
        </select>

        <select v-if="filterAmountType == 'income'" v-model="filterCategory">
            <option value="월급">월급</option>
            <option value="용돈">용돈</option>
            <option value="구걸">구걸</option>
        </select>

        <select v-if="filterAmountType == 'expense'" v-model="filterCategory">
            <option value="공과금">공과금</option>
            <option value="병원비">병원비</option>
            <option value="식바">식비</option>
        </select>

        <ul>
            <li v-for="item in filteredManageList" :key="item.id">
                {{ [item.category] }} {{ item.date }} {{ item.amount }}
                {{ item.memo }}
            </li>
        </ul>

        <!-- 필터x -->
        <!-- <ul>
            <li
                v-for="item in moneyManageStore.states.manageList"
                :key="item.id"
            >
                {{ [item.category] }}{{ item.date }} {{ item.amount }}
                {{ item.memo }}:
            </li>
        </ul> -->
    </div>
</template>

<script setup>
import { useMoneyManageStore } from "@/stores/counter";
import { ref, onMounted, computed } from "vue";

const filterList = useMoneyManageStore();
onMounted(() => {
    filterList.fetchMoneyManageList();
});

const { states, fetchMoneyManageList } = filterList;

const filterCategory = ref("");
const filterDate = ref("");
const filterAmountType = ref("all");

// 필터 매서드
const filteredManageList = computed(() => {
    return filterList.states.manageList.filter((item) => {
        const matchesCategory =
            filterCategory.value === "" ||
            item.category === filterCategory.value;
        // item.category.includes(filterCategory.value);
        // console.log("asdadas :", item.category === filterCategory.value);
        const matchesDate =
            filterDate.value === "" || item.month === filterDate.value;
        const matchesAmountType =
            filterAmountType.value === "all" ||
            (filterAmountType.value === "income" && item.amount > 0) ||
            (filterAmountType.value === "expense" && item.amount < 0);

        return matchesCategory && matchesDate && matchesAmountType;
    });
});
</script>
