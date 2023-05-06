<template>
  <div class="memo">
    <div class="act">
      <button class="btn btn-primary" @click="add">+ 추가</button>
    </div>
    <ul>
      <li v-for="d in state.data" :key="d.id" @click="edit(d.id)">
        {{ d.content }}
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";

export default {
  setup() {
    const state = reactive({
      data: [],
    });

    const add = () => {
      const content = prompt("내용을 입력해주세요.");

      if (!content) {
        alert("내용을 입력해주세요!!!!!");
        return add();
      }

      axios.post("/api/memos", { content: content }).then((res) => {
        state.data = res.data;
      });
    };

    const edit = (id) => {
      const content = prompt(
        "내용을 입력해주세요",
        state.data.find((d) => d.id === id).content
      );
      // console.log(content);
      axios.put("/api/memos/" + id, { content }).then((res) => {
        state.data = res.data;
      });
    };

    // 프론트엔드에서 백엔드에게 데이터를 요청한다.
    axios.get("/api/memos").then((res) => {
      state.data = res.data;
    });

    return {
      state,
      add,
      edit,
    };
  },
};
</script>

<style lang="scss" scoped>
.memo {
  .act {
    padding: 10px 10px 5px 5px;
    text-align: right;
  }
  ul {
    list-style: none;
    padding: 15px;
    margin: 0;

    li {
      padding: 15px;
      margin: 10px 0;
      border: 1px solid #eee;
    }
  }
}
</style>
