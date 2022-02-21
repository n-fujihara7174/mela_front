<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          v-for="(element, index) in refState.pageNumberList"
          :key="index"
          class="page-item"
        >
          <span
            class="page-link"
            :class="{
              '.select-page-link': (element = refState.NumberOfSelectPage),
            }"
            @click="selectPage(element)"
            >{{ element }}</span
          >
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, emit } from "vue";

interface State {
  pageNumberList: number[];
  currentPageNumber: number;
  NumberOfSelectPage: number;
}

export default defineComponent({
  props: {
    listLength: {
      type: Number as PropType<number>,
      required: true,
    },
    NumberOfDisplayOnOnePage: {
      type: Number as PropType<number>,
      required: true,
    },
    NumberOfDisplayOnOneTimeForPage: {
      type: Number as PropType<number>,
      required: true,
    },
    startIndex: {
      type: Number as PropType<number>,
      required: true,
    },
    endIndex: {
      type: Number as PropType<number>,
      required: true,
    },
  },

  setup(props) {
    const refState = reactive<State>({
      pageNumberList: [],
      currentPageNumber: 1,
      NumberOfSelectPage: 1,
    });

    /* **********************************************************************************
    1ページに表示するレコード数を取得
    ********************************************************************************** */
    const getNumberOfDisplayOnOnePage = () => {
      return props.NumberOfDisplayOnOnePage;
    };

    const ConNumberOfDisplayOnOnePage = getNumberOfDisplayOnOnePage();

    /* **********************************************************************************
    要素数 / 一ページに表示するレコードの数 で除算しページ数を算出
    算出したページ数分、配列に要素を追加
    ********************************************************************************** */
    const calculationPageNumber = () => {
      const pageOfNumber = props.listLength / ConNumberOfDisplayOnOnePage;

      //配列をクリア
      refState.pageNumberList = [];
      //ページを追加
      for (let i = 0; i <= pageOfNumber; i++) {
        refState.pageNumberList.push(i);
      }
    };

    calculationPageNumber();

    const selectPage = (element) => {
      refState.NumberOfSelectPage = element;
      //選択したページの先頭のインデックスを取得
      emit("update:startIndex", (element - 1) * 50 + 1);
      emit("update:startIndex", (element - 1) * 50 + 1);
    };

    return { refState, selectPage };
  },
});
</script>
<style scoped>
.select-page-link {
  color: #0a58ca;
  background-color: #e9ecef;
  border-color: #dee2e6;
}
</style>
