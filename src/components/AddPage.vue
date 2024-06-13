<!-- 입출금 컴포넌트 -->
<template>
    <div class="subcontainer">
        <div>
            <div>
                <h3>새로운 거래</h3>
                <hr />
            </div>
            <!-- 날짜 입력 -->
            <form @submit.prevent="handleSubmit">
                <h3>날짜</h3>

                <div class="dateInput">
                    <input type="number" v-model="year" placeholder="YYYY" />
                    <input type="number" v-model="month" placeholder="MM" />
                    <input type="number" v-model="day" placeholder="DD" />
                </div>

                <!-- 내용(입출금 선택) -->

                <h3>내용</h3>
                <!-- ============    카테고리 설정 ================-->
                <div class="categorySelect">
                    <button class="categorySelectBtn" @click="openModal">
                        <img :src="selectedImg" alt="x" />

                        {{ selectedCategory }}
                    </button>
                    <CategoryModal :isOpen="isModalOpen" @close="closeModal" />
                </div>
                <!-- 내용입력 -->
                <div>
                    <input
                        class="memo"
                        type="textarea"
                        v-model="memo"
                        placeholder="메모내용"
                    />
                </div>

                <!-- <hr /> -->

                <h3>금액</h3>
                <div>
                    <input
                        class="inputMoney"
                        type="number"
                        v-model="amount"
                        placeholder="금액을 입력하세요"
                    />
                </div>
                <div class="submitCancel">
                    <button type="submit">입력하기</button>
                    <button
                        type="button"
                        @click="resetForm"
                        class="cancel-link"
                    >
                        취소
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { useMoneyManageStore } from "@/stores/counter";
import { ref, onMounted } from "vue";
import CategoryModal from "./CategoryModal.vue";
import EventBus from "../eventBus";
import { useRouter } from "vue-router";

const selectedImg = ref("src/icons/date.png");
const router = useRouter();
const selectedCategory = ref("카테고리 설정 ✚");
const isModalOpen = ref(false);
const year = ref("");
const month = ref("");
const day = ref("");
const amount = ref("");
const memo = ref("");
const category = ref("");
const isDeposit = ref(true);

const moneyManageStore = useMoneyManageStore();
onMounted(() => {
    moneyManageStore.fetchMoneyManageList();
});
const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

EventBus.on("tagSelected", ({ tagImg, tagName, isIncome: income }) => {
    selectedImg.value = tagImg;
    selectedCategory.value = tagName;
    isDeposit.value = income; // 수입인지 지출인지 설정
    category.value = tagName; // 선택한 카테고리를 설정
    router.push("/add");
});

const { states, fetchMoneyManageList, saveMoney } = moneyManageStore;

const handleSubmit = () => {
    const yearValue = parseInt(year.value, 10);
    const monthValue = parseInt(month.value, 10);
    const dayValue = parseInt(day.value, 10);
    const amountValue = parseFloat(amount.value);

    if (
        !isNaN(yearValue) &&
        !isNaN(monthValue) &&
        !isNaN(dayValue) &&
        !isNaN(amountValue)
        // &&!isNaN(selectedCategory === "카테고리 설정")
    ) {
        const finalAmount = isDeposit.value ? amountValue : -amountValue;
        moneyManageStore.saveMoney(
            yearValue,
            monthValue,
            dayValue,
            amountValue,
            memo.value,
            category.value,
            isDeposit.value
        );

        // Reset form fields
        year.value = "";
        month.value = "";
        day.value = "";
        amount.value = "";
        memo.value = "";
        category.value = "";
        isDeposit.value = true; // 기본값으로 되돌림
    } else {
        // alert("모든 입력란을 정확히 입력해주세요.");
    }
};

const resetForm = () => {
    year.value = "";
    month.value = "";
    day.value = "";
    amount.value = "";
    memo.value = "";
    category.value = "";
    isDeposit.value = true; // 기본값으로 되돌림
    selectedCategory.value = "카테고리 설정";
};
</script>

<style>
/* 새로운거래 , 날짜, 내용, 금액 글자 margin값 적용 */
h3 {
    margin-bottom: 10px;
    margin-top: 10px;
}

/* input태그, button 태그 일괄 적용 CSS */
input,
button {
    border: 1.090000033378601px solid #6d6d6d;
    border-radius: 10px;
    background-color: #f8eba0;
    text-align: center;
    border-radius: 10px;
}

/* 날짜 기입 CSS */
.dateInput {
    display: flex;
    justify-content: space-between; /* 간격 유지 */
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
}

/* input 태그 안쪽 CSS */
.dateInput input {
    width: 30%;
    height: 40px;
    /* padding: 5px; */
    border: 1px solid #6d6d6d;
    background-color: #f8eba0;
    font-weight: 500;
    font-size: 20px;
    line-height: 1.5;
    text-align: center;
    color: black;
}

.categorySelect {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.categorySelectBtn {
    width: 100%;
    height: 100px;
    padding: 10px 20px;
    font-size: 30px;
    text-align: center;
    /* background-color: #f0f0f0; */
    /* border-radius: 5px; */
    border-style: dashed;
    cursor: pointer;
    font-weight: bold;
    color: black;
}

.categorySelect button:hover {
    background-color: #af8f6f;
}
/* 메모내용 CSS */
.memo {
    width: 98%;
    display: flex;
    justify-content: flex;
    height: 50px;
    font-size: 30px;
    /* padding: 12px 16px; */
    background-color: #f8eba0;
}

/* 금액입력 버튼 CSS */
.inputMoney {
    width: 98%;
    height: 40px;
    /* flex: 1; */
    min-width: 50px;
    font-weight: 500;
    font-size: 20px;
    line-height: 1.4;
    text-align: center;
    background-color: #f8eba0;
    margin-bottom: 10px;
}

/* 확인 및 취소 버튼 CSS */
.submitCancel {
    display: flex;
    justify-content: space-between;
}
.submitCancel button {
    width: 130px;
    height: 40px;
    background-color: #af8f6f;
    color: white;
    padding: 10px 20px;
    cursor: pointer;
}

/* input type="number" 화살표 제거 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.cancel-link,
.cancel-link:visited {
    text-decoration: none; /* 방문한 링크와 방문하지 않은 링크의 밑줄 제거 */
    color: white; /* 링크의 색상 변경 */
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* 반투명한 검은색 배경 */
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
}
img {
    width: 30px;
    height: 30px;
}
</style>
