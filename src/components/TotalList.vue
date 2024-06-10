<template>
    <div>
        <div>
            <img src="" alt="차트 넣기" />
        </div>
        <span> 들어온돈 {{ totalAmountPlus }} </span>
        <span> 나간 돈 {{ totalAmountMinus }} </span>
    </div>
</template>

<script setup>
import { useMoneyManageStore } from "@/stores/counter";
import { ref, onMounted } from "vue";

const totalAmountPlus = ref(0);
const totalAmountMinus = ref(0);

const totalManage = useMoneyManageStore();

const calculateTotals = () => {
    totalAmountPlus.value = 0;
    totalAmountMinus.value = 0;

    states.manageList.forEach((item) => {
        if (item.amount > 0) {
            totalAmountPlus.value += item.amount;
        } else if (item.amount < 0) {
            totalAmountMinus.value += item.amount;
        }
    });
};

onMounted(async () => {
    await fetchMoneyManageList();
    calculateTotals();
});

const { states, fetchMoneyManageList } = totalManage;
</script>

<style lang="scss" scoped></style>
