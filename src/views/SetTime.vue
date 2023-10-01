<template>
  <div>
    <el-card>
      <el-table :data="dataList" style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column label="本日是否供餐" width="210">
          <template #="{ row }">
            <el-switch
              v-model="row.meal"
              class="mb-2"
              active-text="本日供餐"
              inactive-text="本日不供餐"
              style="--el-switch-on-color: #8fc325; --el-switch-off-color: #aaa"
            />
          </template>
        </el-table-column>
        <el-table-column label="全日供餐" width="130">
          <template #="{ row }">
            <el-checkbox
              v-if="row.meal"
              v-model="row.allDay"
              @change="row.allDay ? true : false"
              label="全日供餐"
            />
          </template>
        </el-table-column>
        <el-table-column label="Time">
          <template #="{ row }">
            <div v-if="row.meal && !row.allDay" style="width: 100%">
              <div
                v-for="(item, index) in row.timeList"
                style="width: 100%; margin: 5px"
              >
                <!-- element UI time-select 無法顯示23:59 除非自訂義組件或使用dropdown給list或是這用step="00:01" 但會loading很久 -->
                <!-- 這邊先周轉使用button 解決 -->
                <el-time-select
                  v-model="item.start"
                  :min-time="setMin(row.timeList, index)"
                  :max-time="item.end"
                  placeholder="Start time"
                  :clearable="false"
                  prefix-icon=""
                  start="00:00"
                  step="00:30"
                  end="23:59"
                  style="--el-color-primary: #8fc325"
                />
                &nbsp&nbsp-&nbsp&nbsp
                <el-time-select
                  :disabled="item.start === ''"
                  v-model="item.end"
                  :min-time="item.start"
                  :max-time="setMax(row.timeList, index)"
                  placeholder="End time"
                  :clearable="false"
                  prefix-icon=""
                  start="00:00"
                  step="00:30"
                  end="23:59"
                  style="--el-color-primary: #8fc325"
                />

                <el-button
                  style="margin: 5px 0px 5px 17px; background-color: #f4f4f4"
                  @click="row.timeList.splice(index, 1)"
                >
                  Del
                </el-button>
                <el-button
                  v-if="
                    row.timeList.length === index + 1 &&
                    row.timeList[index].start !== '' &&
                    row.timeList[index].end !== '23:59'
                  "
                  style="margin: 5px 0px 5px 17px; background-color: #f4f4f4"
                  @click="row.timeList[index].end = '23:59'"
                >
                  至23:59
                </el-button>
              </div>

              <el-button
                style="
                  width: 58.5%;
                  margin: 5px;
                  background-color: #8fc325;
                  color: white;
                "
                v-if="checkAllDay(row)"
                @click="addTimeList(row)"
              >
                Add
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import apiTime from "@/api/apiSetTime.json";
import type {
  TimeType,
  TimeListType,
  DataType,
  AllDataListType,
} from "@/api/apiSetTimeType";
import { ElMessage } from "element-plus";

const dataList = ref<AllDataListType>([
  {
    date: "Sunday",
    meal: false,
    timeList: [{ start: "", end: "" }],
    id: "1",
    allDay: false,
  },
  {
    date: "Monday",
    meal: true,
    timeList: [{ start: "", end: "" }],
    id: "2",
    allDay: false,
  },
  {
    date: "Tuesday",
    meal: true,
    timeList: [{ start: "", end: "" }],
    id: "3",
    allDay: false,
  },
  {
    date: "Wednesday",
    meal: true,
    timeList: [{ start: "", end: "" }],
    id: "4",
    allDay: false,
  },
  {
    date: "Thursday",
    meal: true,
    timeList: [{ start: "", end: "" }],
    id: "5",
    allDay: false,
  },
  {
    date: "Friday",
    meal: true,
    timeList: [{ start: "", end: "" }],
    id: "6",
    allDay: false,
  },
  {
    date: "Saturday",
    meal: true,
    timeList: [{ start: "", end: "" }],
    id: "7",
    allDay: false,
  },
]);

const checkAllDay = (row: DataType) => {
  return !row.timeList.some((item) => item.end === "23:59");
};

const setMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const minute = minutes % 60;
  const time = `${hours.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}`;
  return time;
};
const setTime = (data: string) => {
  let startAt = "";
  let endAt = "";
  let start = false;
  let change = false;
  let time = <TimeListType>[];

  data.split("").map((unit: string, index: number) => {
    if (!start && unit === "1") {
      change = true;
      start = true;
      const miunte = index * 30;
      startAt = setMinutes(miunte);
    } else if (start && unit === "0" && start) {
      change = true;
      start = false;
      const miunte = index * 30;
      endAt = setMinutes(miunte);
      time.push({
        start: startAt,
        end: endAt,
      });
    }
    if (!change && index === 47) {
      time.push({
        start: "00:00",
        end: "23:59",
      });
    }
    if (change && index === 47 && unit === "1") {
      time.push({
        start: startAt,
        end: "23:59",
      });
    }
  });
  return time;
};
const setMin = (timeList: TimeListType, index: number) => {
  if (timeList[index - 1]?.end) {
    let time = timeList[index - 1]?.end;
    let binaryString = "";
    const [hours, minutes] = time.split(":");
    const totalMinutes = +hours * 60 + +minutes;
    for (let i = 0; i < 48; i++) {
      binaryString += i * 30 < totalMinutes ? "1" : "0";
    }
    let lastIndex = binaryString.lastIndexOf("1");
    if (lastIndex !== -1) {
      let modifiedString =
        binaryString.substring(0, lastIndex) +
        "0" +
        binaryString.substring(lastIndex + 1);

      return setTime(modifiedString)[0].end;
    }
  }
};
const setMax = (timeList: TimeListType, index: number) => {
  if (timeList[index + 1]?.start) {
    let time = timeList[index + 1]?.start;
    let binaryString = "";
    const [hours, minutes] = time.split(":");
    const totalMinutes = +hours * 60 + +minutes;
    for (let i = 0; i < 48; i++) {
      binaryString += i * 30 < totalMinutes ? "1" : "0";
    }
    let lastIndex = binaryString.indexOf("0");
    if (lastIndex !== -1) {
      let modifiedString =
        binaryString.substring(0, lastIndex) +
        "1" +
        binaryString.substring(lastIndex + 1);
      return setTime(modifiedString)[0].end;
    }
  }
};
const getTime = () => {
  dataList.value = dataList.value.map((day: DataType, i: number) => {
    let time = setTime(Object.values(apiTime)[i]);

    return {
      ...day,
      timeList: time,
    };
  });
};
const addTimeList = (row: DataType) => {
  if (row.timeList[row.timeList.length - 1]?.start === "") {
    ElMessage({
      type: "error",
      message: "請填入時間",
    });
    return;
  }

  row.timeList.push({ start: "", end: "" });
};

watch(
  () => dataList.value,
  () => {
    dataList.value.map((item: DataType) => {
      for (let i = 0; i < item.timeList.length; i++) {
        if (item.timeList[i]?.start === item.timeList[i - 1]?.end) {
          item.timeList[i].start = item.timeList[i - 1].start;
          item.timeList[i - 1].start = "";
          item.timeList[i - 1].end = "";

          item.timeList = item.timeList.filter(
            (time: TimeType) => time.start !== "" || time.end !== ""
          );
          return item.timeList;
        }
      }
      if (
        item.timeList[0]?.start === "00:00" &&
        item.timeList[0]?.end === "23:59"
      ) {
        item.allDay = true;
        item.timeList = [];
      }
    });
  },
  { deep: true }
);

getTime();
</script>
<style scoped lang="scss"></style>
