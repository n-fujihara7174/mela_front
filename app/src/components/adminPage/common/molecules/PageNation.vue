<template>
  <div v-show="judgeDisplayPageNation">
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
              '.select-page-link': element === refState.numberOfSelectPage,
            }"
            @click="selectPage(element)"
            >{{ element }}
          </span>
        </li>
        <li class="page-item" v-show="judgeDisplayLastPageNumber">
          <span class="ellipsis">...</span>
        </li>
        <li class="page-item" v-show="judgeDisplayLastPageNumber">
          <span
            class="page-link"
            @click="
              selectPage(
                refState.pageNumberList[refState.pageNumberList.length - 1]
              )
            "
            >{{ refState.pageOfNumber }}
          </span>
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
import {
  defineComponent,
  PropType,
  reactive,
  watchEffect,
  computed,
} from "vue";

interface State {
  pageNumberList: number[];
  currentPageNumber: number;
  numberOfSelectPage: number;
  pageOfNumber: number;
}

export default defineComponent({
  props: {
    listLength: {
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

  setup(props, { emit }) {
    const refState = reactive<State>({
      pageNumberList: [],
      currentPageNumber: 1,
      numberOfSelectPage: 1,
      pageOfNumber: 0,
    });

    const numberOfDisplayOnOnePage = 50;
    const numberOfDisplayOnOneTimeForPage = 5;

    /* **********************************************************************************
    ページ数を算出
    ********************************************************************************** */
    //総ページ数
    refState.pageOfNumber = props.listLength / numberOfDisplayOnOnePage;

    /* **********************************************************************************
    最初に表示するページ番号を算出
    ********************************************************************************** */
    const calculationStartPageNumber = (selectPage: number): number => {
      //ページを選択した際に選択したページが中央になるように最初のページ番号を算出
      let startPageNumber = selectPage - numberOfDisplayOnOneTimeForPage / 2;
      startPageNumber = Math.ceil(startPageNumber);

      //中央になるように引き算した場合、ページ番号がマイナスになるか？
      if (startPageNumber < 1 || isNaN(startPageNumber)) {
        //1ページ目を返却
        return 1;
      } else {
        //算出されたページ番号を返却
        return startPageNumber;
      }
    };

    /* **********************************************************************************
    要素数 / 一ページに表示するレコードの数 で除算しページ数を算出
    算出したページ数分、配列に要素を追加
    最後のページのページ番号を表示するかどうか判定
    ********************************************************************************** */
    const calculationPageNumber = (selectPage = 1) => {
      //配列をクリア
      refState.pageNumberList = [];

      let loopCounter = 0;
      let displayStartPageNumber = 0;

      //ページ数が一度に表示するページ数より小さいか？
      if (refState.pageOfNumber < numberOfDisplayOnOneTimeForPage) {
        //表示するページの個数を全体のページ数と同じにする
        loopCounter = refState.pageOfNumber;

        //最初に表示するページ番号を1にセット
        displayStartPageNumber = 1;
      } else if (refState.pageOfNumber - selectPage < 4) {
        loopCounter = refState.pageOfNumber - selectPage + selectPage;
        console.log("loopCounter : " + loopCounter);
        console.log("refState.pageOfNumber : " + refState.pageOfNumber);
        console.log("selectPage : " + selectPage);
      } else {
        //最初に表示するページ番号をセット
        displayStartPageNumber = calculationStartPageNumber(selectPage);

        loopCounter = displayStartPageNumber + 4;
      }

      //ページを追加
      for (let i = displayStartPageNumber; i <= loopCounter; i++) {
        refState.pageNumberList.push(i);
      }
    };

    calculationPageNumber();

    /* **********************************************************************************
    ページを選択した際の処理
    ********************************************************************************** */
    const selectPage = (element: number) => {
      refState.numberOfSelectPage = element;
      calculationPageNumber(element);

      //選択したページの要素の先頭のインデックスを親に渡す  ※配列のインデックスは0からスタートなので、+1しなくても問題ない
      emit("update:startIndex", (element - 1) * numberOfDisplayOnOnePage);

      //選択したページの要素の最後のインデックスを親に渡す  ※配列のインデックスは0からスタートなので、+1しなくても問題ない
      emit("update:endIndex", element * numberOfDisplayOnOnePage);
    };

    /* **********************************************************************************
    ページ数を算出
    ********************************************************************************** */
    watchEffect(() => {
      refState.pageOfNumber = props.listLength / numberOfDisplayOnOnePage;
    });

    /* **********************************************************************************
    ページネーションを表示するか判定
    ********************************************************************************** */
    const judgeDisplayPageNation = computed(() => {
      return refState.pageOfNumber > 1;
    });

    /* **********************************************************************************
    最後のページを表示するか判定
    ********************************************************************************** */
    const judgeDisplayLastPageNumber = computed(() => {
      console.log(
        refState.pageOfNumber !==
          refState.pageNumberList[refState.pageNumberList.length - 1]
      );
      console.log(refState.pageOfNumber > 5);
      return (
        refState.pageOfNumber !==
          refState.pageNumberList[refState.pageNumberList.length - 1] &&
        refState.pageOfNumber > 5
      );
    });

    return {
      refState,
      selectPage,
      judgeDisplayPageNation,
      judgeDisplayLastPageNumber,
    };
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
