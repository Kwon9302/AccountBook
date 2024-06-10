<!-- 입출금 컴포넌트 -->
<!-- 새로운 거래 -->

<template>
    <div>
        <div>
            <h1>새로운 거래</h1>
            <hr />
        </div>

        <!-- 날짜 입력 -->
        <form @submit.prevent="handleSubmit">
            <div>
                <h2>날짜</h2>
                <span id="dateInput">
                    <input
                        type="number"
                        v-model="year"
                        placeholder="YYYY"
                        required
                    />
                    <input
                        type="number"
                        v-model="month"
                        placeholder="MM"
                        required
                    />
                    <input
                        type="number"
                        v-model="day"
                        placeholder="DD"
                        required
                    />
                </span>
            </div>

            <!-- 내용(입출금 선택) -->
            <div id="content">
                <h2>내용</h2>
                <span>
                    <button
                        type="button"
                        @click="selectDeposit"
                        :class="{ active: isDeposit }"
                    >
                        들어온 돈
                    </button>
                    <button
                        type="button"
                        @click="selectWithdraw"
                        :class="{ active: !isDeposit }"
                    >
                        나간 돈
                    </button>
                </span>
                <!-- 숨겨진 select 박스 -->
                <div>
                    <select v-if="isDeposit" v-model="category">
                        <option value="월급">월급</option>
                        <option value="용돈">용돈</option>
                        <option value="구걸">구걸</option>
                    </select>
                </div>
                <div>
                    <select v-if="!isDeposit" v-model="category">
                        <option value="공과금">공과금</option>
                        <option value="병원비">병원비</option>
                        <option value="식비">식비</option>
                    </select>
                </div>
                <!-- 내용입력 -->
                <div>
                    <input
                        type="textarea"
                        v-model="memo"
                        placeholder="메모내용"
                    />
                </div>
            </div>
            <hr />
            <div>
                <h2>금액</h2>
                <input
                    type="number"
                    v-model="amount"
                    placeholder="금액을 입력하세요"
                />
            </div>
            <h1></h1>
            <button type="submit">입력하기</button>
            <button type="button" @click="resetForm">취소</button>
        </form>
        <hr />
        <!-- 내역
        <h1>내역 페이지</h1>
        필터 입력 필드-->
        <!-- <input v-model="filterCategory" placeholder="카테고리 필터" /> -->

        <!-- <input v-model="filterDate" type="number" placeholder="날짜 필터" /> -->
        <!-- <select v-model="filterDate" required>
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
        </ul> -->

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
// import axios from "axios";

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

const selectDeposit = () => {
    isDeposit.value = true;
};

const selectWithdraw = () => {
    isDeposit.value = false;
};
const { states, fetchMoneyManageList, saveMoney } = moneyManageStore;

// const filterCategory = ref("");
// const filterDate = ref("");
// const filterAmountType = ref("all");

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
    ) {
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
        alert("모든 입력란을 정확히 입력해주세요.");
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
};

// // 필터 매서드
// const filteredManageList = computed(() => {
//     return moneyManageStore.states.manageList.filter((item) => {
//         const matchesCategory =
//             filterCategory.value === "" ||
//             item.category === filterCategory.value;
//         // item.category.includes(filterCategory.value);
//         // console.log("asdadas :", item.category === filterCategory.value);
//         const matchesDate =
//             filterDate.value === "" || item.month === filterDate.value;
//         const matchesAmountType =
//             filterAmountType.value === "all" ||
//             (filterAmountType.value === "income" && item.amount > 0) ||
//             (filterAmountType.value === "expense" && item.amount < 0);

//         return matchesCategory && matchesDate && matchesAmountType;
//     });
// });
</script>

<style>
button.active {
    background-color: blue; /* 활성 상태 스타일 */
    color: white;
}
</style>
