<template>
  <div>
    <InputColumn
      v-model:value="refState.value"
      :isError="!!refState.errorMessage"
      :isTextarea="refState.isTextarea"
      @focus="onFocus"
      @blur="unFocus"
    ></InputColumn>
    <div v-show="judgeDisplay">
      <SuggestList
        v-model:value="refState.value"
        :list="refState.list"
        @mouseover="mouseover"
        @mouseleave="mouseleave"
      ></SuggestList>
    </div>
    <ErrorMessageLabel
      :errorMessage="refState.errorMessage"
    ></ErrorMessageLabel>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  reactive,
  onMounted,
  watch,
  watchEffect,
  computed,
} from "vue";

import ErrorMessageLabel from "@/components/adminPage/common/atom/errorLabel.vue";
import InputColumn from "@/components/adminPage/common/atom/input.vue";
import SuggestList from "@/components/adminPage/common/atom/SuggestList.vue";

interface State {
  value: string;
  errorMessage: string;
  list: string[];
  isTextarea: boolean;
  isDisplaySuggest: boolean;
  isFocus: boolean;
  isHover: boolean;
}

export default defineComponent({
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
    errorMessage: {
      type: String as PropType<string>,
      required: true,
    },
    list: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => [],
    },
    isTextarea: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
  },

  components: {
    ErrorMessageLabel: ErrorMessageLabel,
    InputColumn: InputColumn,
    SuggestList: SuggestList,
  },

  setup(props, { emit }) {
    const refState = reactive<State>({
      value: "",
      errorMessage: "",
      list: [],
      isTextarea: false,
      isDisplaySuggest: false,
      isFocus: false,
      isHover: false,
    });

    onMounted(() => {
      refState.value = props.value;
      refState.list = props.list;
      refState.isTextarea = props.isTextarea;
      refState.isDisplaySuggest = !!props.list.length;
    });

    const onFocus = () => {
      refState.isFocus = true;
    };

    const unFocus = () => {
      refState.isFocus = false;
    };

    const mouseover = () => {
      refState.isHover = true;
    };

    const mouseleave = () => {
      refState.isHover = false;
    };

    const emitValue = (value: string) => {
      emit("update:value", value);
    };

    const judgeDisplay = computed(() => {
      return (
        refState.isDisplaySuggest && (refState.isFocus || refState.isHover)
      );
    });

    watchEffect(() => emitValue(refState.value));

    watch(
      () => props.errorMessage,
      () => {
        console.log("inputFieldの中");
        console.log(props.errorMessage);
        refState.errorMessage = props.errorMessage;
      }
    );

    return {
      refState,
      onFocus,
      unFocus,
      mouseover,
      mouseleave,
      judgeDisplay,
      emitValue,
    };
  },
});
</script>
