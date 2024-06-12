<template>
    <div>
        <h1>총 금액 출력</h1>
        <div>
            <ImageComponent :totalMoney="totalMoney" />
        </div>
        <h1>{{ totalMoney }}</h1>
        <div>들어온돈 : {{ totalAmountPlus }}</div>
        <div>나간 돈 : {{ totalAmountMinus }}</div>
    </div>
</template>

<script setup>
import { useMoneyManageStore } from "@/stores/counter";
import { ref, onMounted } from "vue";
import ImageComponent from "@/components/ImageComponent.vue";

const totalAmountPlus = ref(0);
const totalAmountMinus = ref(0);
const totalMoney = ref(0);
const totalManage = useMoneyManageStore();

const calculateTotals = () => {
    totalAmountPlus.value = 0;
    totalAmountMinus.value = 0;

    states.manageList.forEach((item) => {
        if (item.amount > 0) {
            totalAmountPlus.value += item.amount;
            totalMoney.value += item.amount;
        } else if (item.amount < 0) {
            totalAmountMinus.value += item.amount;
            totalMoney.value += item.amount;
        }
    });
};

// ??
onMounted(async () => {
    await fetchMoneyManageList();
    calculateTotals();
});

const { states, fetchMoneyManageList } = totalManage;
</script>
