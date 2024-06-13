<!-- 입출금 컴포넌트 -->
<template>
    <div class="subcontainer">
        <div class="addPages">
            <div>
                <h3>새로운 거래</h3>
                <hr />
            </div>
            <!-- 날짜 입력 -->
            <form @submit.prevent="handleSubmit">
                <h3>날짜</h3>

                <div class="dateInput">
                    <input
                        type="number"
                        v-model="year"
                        placeholder="YYYY"
                        @input="validateYear"
                    />
                    <input
                        type="number"
                        v-model="month"
                        placeholder="MM"
                        @input="validateMonth"
                    />
                    <input
                        type="number"
                        v-model="day"
                        placeholder="DD"
                        @input="validateDay"
                    />
                </div>

                <!-- 내용(입출금 선택) -->

                <h3>내용</h3>
                <!-- ============    카테고리 설정 ================-->
                <div class="categorySelect">
                    <button class="categorySelectBtn" @click="openModal">
                        <img
                            :src="selectedImg"
                            alt="이미지를 넣어주세요"
                            class="category-addpage-img"
                        />
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

                <!-- 경고창 -->
                <div class="alert-msg">
                    <img
                        v-if="alertMessage"
                        src="../icons/alert-1.png"
                        alt=""
                        style="width: 14px; height: 14px"
                    />
                    {{ alertMessage }}
                </div>

                &nbsp;

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
import { ref, onMounted, watch } from "vue";
import CategoryModal from "./CategoryModal.vue";
import EventBus from "../eventBus";
import { useRouter } from "vue-router";

const selectedImg = ref("src/icons/add-button.png");
const router = useRouter();
const selectedCategory = ref("카테고리 설정");
const isModalOpen = ref(false);
const year = ref("");
const month = ref("");
const day = ref("");
const amount = ref("");
const memo = ref("");
const category = ref("");
const isDeposit = ref(true);
const alertMessage = ref("");

const moneyManageStore = useMoneyManageStore();
onMounted(() => {
    moneyManageStore.fetchMoneyManageList();
});
// 년월일 input 검증
const validateYear = () => {
    if (year.value < 2) {
        year.value = "";
    } else if (year.value > 2024) {
        year.value = 2024;
    }
};

const validateMonth = () => {
    if (month.value < 1) {
        month.value = "";
    } else if (month.value > 12) {
        month.value = 12;
    }
};

const validateDay = () => {
    const maxDays = getMaxDaysInMonth(year.value, month.value);
    if (day.value < 1) {
        day.value = "";
    } else if (day.value > maxDays) {
        day.value = maxDays;
    }
};

const getMaxDaysInMonth = (year, month) => {
    if (!year || !month) return 31; // 기본 최대 일수
    return new Date(year, month, 0).getDate(); // 해당 월의 최대 일수
};

// watch를 통해 month 값이 변경될 때 day 값을 다시 검증
watch([year, month], () => {
    validateDay();
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

    if (isNaN(yearValue)) {
        alertMessage.value = "년도를 입력해주세요";
    } else if (isNaN(monthValue)) {
        alertMessage.value = "월을 입력해주세요";
    } else if (isNaN(dayValue)) {
        alertMessage.value = "날짜를 입력해주세요";
    } else if (
        selectedCategory.value === "카테고리 설정" ||
        !selectedCategory.value
    ) {
        alertMessage.value = "카테고리를 넣어주세요";
    } else if (isNaN(amountValue)) {
        alertMessage.value = "금액을 입력해주세요";
    } else {
        alertMessage.value = "";
    }

    if (!alertMessage.value) {
        // alert(alertMessage);

        const finalAmount = isDeposit.value ? amountValue : -amountValue;
        moneyManageStore.saveMoney(
            yearValue,
            monthValue,
            dayValue,
            finalAmount, // finalAmount를 저장하도록 수정
            memo.value,
            selectedCategory.value, // 카테고리 값을 저장하도록 수정
            isDeposit.value
        );

        // Reset form fields
        year.value = "";
        month.value = "";
        day.value = "";
        amount.value = "";
        memo.value = "";
        selectedCategory.value = "카테고리 설정"; // 기본값으로 되돌림
        isDeposit.value = true; // 기본값으로 되돌림
        selectedImg.value = "src/icons/add-button.png";
        alertMessage.value = "";
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
    selectedImg.value = "";
    alertMessage.value = "";

    router.push("history");
};
</script>

<style>
/* 새로운거래 , 날짜, 내용, 금액 글자 margin값 적용 */
h3 {
    margin-bottom: 10px;
    margin-top: 10px;
}

/* input태그, button 태그 일괄 적용 CSS */
.addPages input,
button {
    border: 1.090000033378601px solid #6d6d6d;
    border-radius: 10px;
    background-color: #f8eba0;
    text-align: center;
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
}

.categorySelect {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

.categorySelectBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    width: 100%;
    height: 80px;
    font-size: 30px;
    text-align: center;
    border-style: dashed;
    cursor: pointer;
    /* font-weight: bold; */
    color: #888888;
}

.categorySelect button:hover {
    background-color: #af8f6f;
}
/* 메모내용 CSS */
.memo {
    width: 99.5%;
    display: flex;
    justify-content: flex;
    height: 50px;
    font-size: 30px;
    /* padding: 12px 16px; */
    background-color: #f8eba0;
}

/* 금액입력 버튼 CSS */
.inputMoney {
    width: 99.5%;
    height: 40px;
    /* flex: 1; */
    min-width: 50px;
    font-weight: 500;
    font-size: 20px;
    line-height: 1.4;
    text-align: center;
    background-color: #f8eba0;
    margin-bottom: 5px;
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

.cancel-link {
    background: none;
    border: 1.090000033378601px solid #6d6d6d;
    color: white; /* 링크 색상 변경 */
    text-decoration: none; /* 밑줄 제거 */
    cursor: pointer; /* 버튼 커서 추가 */
    padding: 0;
    font: inherit;
}

.cancel-link:focus {
    outline: none;
}
.category-addpage-img {
    width: 30px;
    height: 30px;
    margin-right: 10px;
}
.alert-msg {
    display: flex;
    align-items: center;
    gap: 5px;
    color: red;
    font-size: 14px;
}
</style>
