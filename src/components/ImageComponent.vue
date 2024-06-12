<template>
  <div>
    <img
      :src="currentImage"
      alt="조건에 따른 이미지"
      class="image"
      width="250px"
      height="250px"
    />
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import { useMoneyManageStore } from '@/stores/counter';

import tiger1 from '../asset/tiger1.jpg';
import tiger2 from '../asset/tiger2.jpg';
import tiger3 from '../asset/tiger3.jpg';

const props = defineProps({
  totalMoney: Number,
});

const moneyStore = useMoneyManageStore();

const currentImage = computed(() => {
  const totalMoneyValue = props.totalMoney;

  if (totalMoneyValue > 5000000) {
    return tiger3; // 500만원 이상
  } else if (totalMoneyValue > 1500000) {
    return tiger2; // 150만원 초과 500만원 이하
  } else {
    return tiger1; // 150만원 이하
  }
});
</script>

<style>
.image {
  max-width: 100%;
  height: auto;
  border-radius: 50%;
}
</style>
