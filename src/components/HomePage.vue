<template>
  <div class="homeContainer">
    <div class="homeContent">
      <div class="contentItem">puppy에게 {{ itemMessage }}을 선물하세요</div>
      <div class="contentItem">
        <ImageComponent :totalMoney="totalMoney" />
      </div>
      <div class="contentItem">지난 1개월간의 거래내역을 확인해보세요</div>
      <h1 class="contentItem">{{ totalMoney }}</h1>
      <div class="amountBoxContainer">
        <div class="amountBox" :class="{ greenText: totalAmountPlus > 0 }">
          <div style="color: black">들어온돈</div>
          <span>+{{ totalAmountPlus }}</span>
        </div>
        <div class="amountBox" :class="{ redText: totalAmountMinus < 0 }">
          <div style="color: black">나간 돈</div>
          <span>{{ totalAmountMinus }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMoneyManageStore } from '@/stores/counter';
import { ref, computed, onMounted } from 'vue';
import ImageComponent from '@/components/ImageComponent.vue';

const totalAmountPlus = ref(0);
const totalAmountMinus = ref(0);
const totalMoney = ref(0);
const totalManage = useMoneyManageStore();
const { states, fetchMoneyManageList } = totalManage;

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

const itemMessage = computed(() => {
  if (totalMoney.value > 5000000) {
    return '집'; // 500만원 이상
  } else if (totalMoney.value > 1500000) {
    return '옷'; // 150만원 초과 500만원 이하
  } else {
    return '아이템'; // 150만원 이하
  }
});
//
onMounted(async () => {
  await fetchMoneyManageList();
  calculateTotals();
});
</script>

<style>
.homeContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-top: 55px;
}
.homeContent {
  margin: 40px auto; /* 전체적인 여백 설정 */
}
.contentItem {
  margin-bottom: 30px; /* 각 요소의 하단 여백 설정 */
}
.redText {
  color: red;
}
.greenText {
  color: green;
}
.amountBoxContainer {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.amountBox {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
.amountBox span {
  margin-left: 5px;
}
</style>
