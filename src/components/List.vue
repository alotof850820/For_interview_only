<template>
  <div>
    <div data-test="todo">test</div>
    <el-card class="box-card">
      <el-button type="primary" @click="addTodo">Add User title</el-button>

      <!-- table -->
      <el-table :data="listData" border style="margin: 10px 0px">
        <el-table-column width="80px" align="center" type="index" />
        <el-table-column width="100px" label="User" align="center">
          <template v-slot="{ row }">
            <pre>我是User{{ row.userId }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="Title" align="center">
          <template v-slot="{ row }">
            <pre>{{ row.title }}</pre>
          </template>
        </el-table-column>

        <el-table-column width="200px" align="center" label="Operate">
          <template v-slot="{ row }">
            <el-button type="primary" size="small" @click="editTodo(row)"
              >Edit</el-button
            >
            <el-popconfirm
              :title="`確定刪除User${row.userId}嗎?`"
              width="250px"
              icon="Delete"
              @confirm="delTodo(row)"
            >
              <template #reference>
                <el-button type="primary" size="small">Del</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- page -->
    </el-card>
    <!-- dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="userData.id ? 'Edit User title' : 'Add User title'"
      width="30%"
    >
      <span>輸入title</span>
      <el-input v-model="userData.title"></el-input>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="ok"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import type { TodoResponseType, TodoType } from "@/api/apiTodoListType";
import { apiAddtodo, apiUpdatetodo, apiDeltodo } from "@/api/apiTodoList";
import { ElMessage } from "element-plus";

defineProps({
  listData: {
    type: Array,
    default: () => [],
  },
});

const dialogVisible = ref<boolean>(false);
const userData = reactive<TodoType>({
  title: "",
  completed: true,
  userId: 1,
});

const emit = defineEmits(["reload"]);

const ok = async () => {
  // edit
  if (userData.id) {
    const res: TodoResponseType = await apiUpdatetodo(userData.id, userData);
    if (res.status === 200) {
      ElMessage({
        type: "success",
        message: "success to Edit data",
      });
      emit("reload");
      dialogVisible.value = false;
    } else {
      ElMessage({
        type: "error",
        message: "Failed to Edit data",
      });
    }
  } else {
    const res: TodoResponseType = await apiAddtodo(userData);
    if (res.status === 201) {
      ElMessage({
        type: "success",
        message: "success to Add data",
      });
      emit("reload");
      dialogVisible.value = false;
    } else {
      ElMessage({
        type: "error",
        message: "Failed to Add data",
      });
    }
  }
};

const addTodo = async () => {
  dialogVisible.value = true;
};

const editTodo = async (row: TodoType) => {
  dialogVisible.value = true;
  Object.assign(userData, {
    id: 1,
    title: row.title,
    completed: true,
    userId: row.userId,
  });
};
const delTodo = async (row: TodoType) => {
  const res: any = await apiDeltodo(row.id as number);

  if (res.status === 200) {
    ElMessage({
      type: "success",
      message: "success to Del data",
    });
    emit("reload");

    dialogVisible.value = false;
  } else {
    ElMessage({
      type: "error",
      message: "Failed to Del data",
    });
  }
};
</script>
<style scoped lang="scss"></style>
