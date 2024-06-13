<!-- 입출금 컴포넌트 -->
<template>
  <div>
    <div>
      <div>
        <h3>새로운 거래</h3>
        <hr />
      </div>
      <!-- 날짜 입력 -->
      <form @submit.prevent="handleSubmit">
        <h3>날짜</h3>

        <div class="dateInput">
          <input type="number" v-model="year" placeholder="YYYY" required />
          <input type="number" v-model="month" placeholder="MM" required />
          <input type="number" v-model="day" placeholder="DD" required />
        </div>

        <!-- 내용(입출금 선택) -->

        <h3>내용</h3>
        <div class="selectInOut">
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
        </div>
        <!-- 숨겨진 select 박스 -->
        <div>
          <select v-if="isDeposit" v-model="category" class="dropdown">
            <option value="월급">월급</option>
            <option value="용돈">용돈</option>
            <option value="구걸">구걸</option>
          </select>
        </div>
        <div>
          <select v-if="!isDeposit" v-model="category" class="dropdown">
            <option value="공과금">공과금</option>
            <option value="병원비">병원비</option>
            <option value="식비">식비</option>
          </select>
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
            required
          />
        </div>
        <div class="submitCancel">
          <button type="submit">입력하기</button>
          <button type="button" @click="resetForm" class="cancel-link">
            <!-- <router-link to="/list" @click.native="resetForm" class="cancel-link"> -->
            취소
            <!-- </router-link> -->
          </button>
        </div>
        <!-- 링크 x -->
        <!-- <button type="button" @click="resetForm">취소</button> -->
      </form>
    </div>
  </div>
</template>

<script setup>
import { useMoneyManageStore } from '@/stores/counter';
import { ref, onMounted, computed } from 'vue';
// import axios from "axios";

const year = ref('');
const month = ref('');
const day = ref('');
const amount = ref('');
const memo = ref('');
const category = ref('');
const isDeposit = ref(null);

const newAmount = computed((amount) => {
  return amount.toLocalString();
});
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
    year.value = '';
    month.value = '';
    day.value = '';
    amount.value = '';
    memo.value = '';
    category.value = '';
    isDeposit.value = true; // 기본값으로 되돌림
  } else {
    alert('모든 입력란을 정확히 입력해주세요.');
  }
};

const resetForm = () => {
  year.value = '';
  month.value = '';
  day.value = '';
  amount.value = '';
  memo.value = '';
  category.value = '';
  isDeposit.value = true; // 기본값으로 되돌림
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
button,
select {
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
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 1.5;
  text-align: center;
  color: black;
}

/* 들어온돈 나간돈 CSS */
.selectInOut {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.selectInOut button {
  width: 130px;
  height: 40px;
}

/* 카테고리 선택 CSS */
.dropdown {
  /* 04 Dropdown (frame) */
  width: 130px;
  height: 30px;
  padding: 8px 16px;

  background: #f8eba0;

  border: 1px solid #6d6d6d;

  margin-bottom: 10px;
}

/* 메모내용 CSS */
.memo {
  width: 98%;
  display: flex;
  justify-content: flex;
  height: 50px;
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

/* 들어온돈 나간돈 활성 CSS */
button.active {
  background-color: #af8f6f; /* 활성 상태 CSS */
  color: black;
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
</style>
