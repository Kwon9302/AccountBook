<template>
    <div>
        <img :src="currentImage" alt="조건에 따른 이미지" class="image" />
    </div>
</template>

<script setup>
import { computed, defineProps } from "vue";
import { useMoneyManageStore } from "@/stores/counter";

const props = defineProps({
    totalMoney: Number,
});

const moneyStore = useMoneyManageStore();

const currentImage = computed(() => {
    const totalMoneyValue = props.totalMoney;

    if (totalMoneyValue >= 3000000) {
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRawwzBBj106xh9LlFC8-O7vwa3n9JZodA8jAoKaFYGxSvaamvrmZAUJ-94lLMk98ZkCLI&usqp=CAU";
    } else if (totalMoneyValue >= 2000000) {
        return "https://newsimg-hams.hankookilbo.com/2022/10/19/7576de8e-e4f6-4827-9f17-cfefe4be052f.jpg";
    } else if (totalMoneyValue >= 1500000) {
        return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyPkxMuo6NOHcNx-aO-wOo3eyVnB2oTq-ZwA&s";
    } else if (totalMoneyValue >= 1000000) {
        return "https://i.pinimg.com/originals/53/7e/f5/537ef59499259ba707068742f91a10f8.jpg";
    } else if (totalMoneyValue >= 800000) {
        return "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201706/23/b71449f8-e830-45a0-bb4d-7b1a328e19f2.jpg";
    } else if (totalMoneyValue >= 500000) {
        return "https://item.kakaocdn.net/do/fd0050f12764b403e7863c2c03cd4d2d7154249a3890514a43687a85e6b6cc82";
    } else if (totalMoneyValue >= 300000) {
        return "https://tvstore-phinf.pstatic.net/20210907_263/1631002069199vDKNA_JPEG/00033.jpg";
    } else {
        return "https://image.yes24.com/Goods/116256860/XL";
    }
});
</script>

<style>
/* 필요한 스타일 지정 */
</style>
