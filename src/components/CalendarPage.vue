<template>
  <div class="calendar-container">
    <div class="calendar-box">
      <div class="header">
        <button @click="previousMonth">&lt;</button>
        <span>{{ currentMonth }}</span>
        <button @click="nextMonth">&gt;</button>
      </div>
      <div class="days">
        <div v-for="(day, index) in days" :key="index" class="day">
          {{ day }}
        </div>
        <div v-for="(day, index) in daysInMonth" :key="index" class="date">
          {{ day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const currentDate = new Date();
const currentYear = ref(currentDate.getFullYear());
const currentMonthIndex = ref(currentDate.getMonth());
const daysInMonth = computed(() => {
  const firstDayOfMonth = new Date(
    currentYear.value,
    currentMonthIndex.value,
    1
  );
  const lastDayOfMonth = new Date(
    currentYear.value,
    currentMonthIndex.value + 1,
    0
  );
  const days = [];
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    days.push(i);
  }
  return days;
});
const currentMonth = computed(() => {
  const options = { month: 'long', year: 'numeric' };
  return new Date(
    currentYear.value,
    currentMonthIndex.value
  ).toLocaleDateString(undefined, options);
});

function previousMonth() {
  if (currentMonthIndex.value === 0) {
    currentYear.value--;
    currentMonthIndex.value = 11;
  } else {
    currentMonthIndex.value--;
  }
}

function nextMonth() {
  if (currentMonthIndex.value === 11) {
    currentYear.value++;
    currentMonthIndex.value = 0;
  } else {
    currentMonthIndex.value++;
  }
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
</script>

<style>
.calendar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.calendar-box {
  width: 280px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
}

.day,
.date {
  border: 1px solid #ccc;
  padding: 5px;
  text-align: center;
}

.day {
  background-color: #f0f0f0;
}
</style>
