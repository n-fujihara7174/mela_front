<template>
  <div class="dropdown">
    <input
      type="text"
      class="form-control dropdown-toggle"
      v-model="refState.inputValue"
      @input="listFilter(refState.inputValue)"
      @focus="onFocus"
      @blur="unFocus"
    />
    <select
      v-show="isDisplay"
      class="form-select"
      size="4"
      aria-label="size 4 select example"
    >
      <option
        class="autocomplete"
        v-for="(element, index) in refState.filteredList"
        :key="index"
        :mouseleave="mouseLeave"
        @click="setInputValue(element)"
        @mouseover="mouseover"
        @mouseleave="mouseLeave"
      >
        {{ element }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  onMounted,
  watch,
  computed,
} from "vue";

interface State {
  filteredList: string[];
  inputValue: string;
  isFocus: boolean;
  isHover: boolean;
}

export default defineComponent({
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
    list: {
      type: Array as PropType<string[]>,
      required: true,
    },
    placeholder: {
      type: String as PropType<string>,
      required: false,
    },
  },

  setup(props, { emit }) {
    console.log("SuggestInputの中");

    const refState = reactive<State>({
      filteredList: [],
      inputValue: "",
      isFocus: false,
      isHover: false,
    });

    onMounted(() => {
      listFilter(refState.inputValue);
    });

    const listFilter = (filterText: string) => {
      if (filterText !== "") {
        refState.filteredList = props.list.filter(
          (listItem) => listItem.indexOf(filterText) === 0
        );
      } else {
        refState.filteredList = [];
      }
    };

    const onFocus = () => {
      refState.isFocus = true;
    };

    const unFocus = () => {
      refState.isFocus = false;
    };

    const mouseover = () => {
      refState.isHover = true;
    };

    const mouseLeave = () => {
      refState.isHover = false;
    };

    const setInputValue = (selectValue: string) => {
      refState.inputValue = selectValue;
    };

    watch(
      () => refState.inputValue,
      () => {
        emit("update:value", refState.inputValue);
      }
    );

    const isDisplay = computed(() => {
      return (
        (refState.isFocus || refState.isHover) &&
        refState.filteredList.length != 0
      );
    });

    const pulldownSize = computed(() => {
      let size = 0;
      if (refState.filteredList.length > 10) {
        console.log("10超える");
        size = 10;
      } else {
        console.log("10超えない");
        size = refState.filteredList.length;
      }
      return size;
    });

    //サジェスト入力処理はできたので、見た目を整える
    //それが出来次第、登録のテストと、idで投稿のデータが取得できない件を調べる

    return {
      refState,
      listFilter,
      onFocus,
      unFocus,
      mouseover,
      mouseLeave,
      setInputValue,
      isDisplay,
      pulldownSize,
    };
  },
});
</script>

<style scoped></style>
