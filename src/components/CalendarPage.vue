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
                <div
                    v-for="(day, index) in daysInMonth"
                    :key="index"
                    :class="{
                        date: true,
                        today: isToday(day),
                        'money-entry': hasMoneyEntry(day),
                    }"
                >
                    {{ day }}
                    <div v-if="hasMoneyEntry(day)">
                        <div
                            v-for="entry in getMoneyEntries(day)"
                            :key="entry.id"
                            class="money-amount"
                            :style="{
                                color: entry.amount > 0 ? 'green' : 'red',
                            }"
                        >
                            {{ entry.amount > 0 ? "+" : "-"
                            }}{{ Math.abs(entry.amount).toLocaleString() }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useMoneyManageStore } from "@/stores/counter";

const store = useMoneyManageStore();

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
    const options = { month: "long", year: "numeric" };
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

function isToday(day) {
    const todayDate = new Date();
    return (
        day === todayDate.getDate() &&
        currentMonthIndex.value === todayDate.getMonth() &&
        currentYear.value === todayDate.getFullYear()
    );
}

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function hasMoneyEntry(day) {
    // 해당 날짜에 돈 항목이 있는지 확인
    const entries = store.states.manageList.filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
            entryDate.getDate() === day &&
            entryDate.getMonth() === currentMonthIndex.value &&
            entryDate.getFullYear() === currentYear.value
        );
    });
    return entries.length > 0;
}

function getMoneyEntries(day) {
    // 해당 날짜의 돈 항목 가져오기
    return store.states.manageList.filter((entry) => {
        const entryDate = new Date(entry.date);
        return (
            entryDate.getDate() === day &&
            entryDate.getMonth() === currentMonthIndex.value &&
            entryDate.getFullYear() === currentYear.value
        );
    });
}
</script>

<style>
.calendar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    margin-top: 55px;
}

.calendar-box {
    width: 280px;
    margin-top: 55px;
    height: auto;
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

.day {
    border: 1px solid #ccc;
    padding: 5px 0;
    text-align: center;
    height: 30px;
}

.date {
    border: 1px solid #ccc;
    padding: 10px 0;
    text-align: center;
    height: 30px;
}

.today {
    background-color: #f0f0f0;
}

.money-amount {
    font-size: 8px;
}
</style>
