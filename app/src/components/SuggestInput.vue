<template>
  <div>
    <input
      type="text"
      v-model="refState.inputValue"
      @input="listFilter(refState.inputValue)"
      @focus="onFocus"
    />
    <div v-show="refState.isFocus">
      <ul>
        <li
          v-for="(element, index) in refState.filteredList"
          :key="index"
          :mouseleave="mouseLeave"
          @click="setInputValue(element)"
        >
          {{ element }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted, watch } from "vue";

interface State {
  filteredList: string[];
  inputValue: string;
  isFocus: boolean;
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
    });

    onMounted(() => {
      listFilter(refState.inputValue);
    });

    const listFilter = (filterText: string) => {
      console.log("listFilterの中");
      console.log("refState.inputValue : " + refState.inputValue);
      if (filterText !== "") {
        console.log("ifのやつはtrue");
        refState.filteredList = props.list.filter(
          (listItem) => listItem.indexOf(filterText) === 0
        );
      } else {
        console.log("ifのやつはfalse");
        refState.filteredList = [];
      }
    };

    const onFocus = () => {
      refState.isFocus = true;
    };

    const mouseLeave = () => {
      refState.isFocus = false;
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

    return {
      refState,
      listFilter,
      onFocus,
      mouseLeave,
      setInputValue,
    };
  },
});
</script>

<style scoped></style>
