<template>
  <div>
    <InputColumn
      v-model:value="refState.value"
      :isError="!!refState.errorMessage"
      :type="refState.type"
      v-model:isFocus="refState.isFocus"
    ></InputColumn>
    <div v-show="judgeDisplay">
      <SuggestList
        v-model:value="refState.value"
        :list="refState.list"
        v-model:isHover="refState.isHover"
        v-model:isExistList="refState.isExistList"
      ></SuggestList>
    </div>
    <ErrorMessageLabel
      :errorMessage="refState.errorMessage"
    ></ErrorMessageLabel>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch, computed } from "vue";

import ErrorMessageLabel from "@/components/common/atom/ErrorLabel.vue";
import InputColumn from "@/components/common/atom/Input.vue";
import SuggestList from "@/components/common/atom/SuggestList.vue";

interface State {
  value: string;
  errorMessage: string;
  list: string[];
  type: string;
  isDisplaySuggest: boolean;
  isFocus: boolean;
  isHover: boolean;
  isExistList: boolean;
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
    type: {
      type: String as PropType<string>,
      required: false,
      default: "",
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
      type: "",
      isDisplaySuggest: false,
      isFocus: false,
      isHover: false,
      isExistList: false,
    });

    const setPropsToState = () => {
      refState.value = props.value;
      refState.list = props.list;
      refState.type = props.type;
      refState.isDisplaySuggest = !!props.list.length;
    };

    setPropsToState();

    const emitValue = (value: string) => {
      emit("update:value", value);
    };

    const judgeDisplay = computed(() => {
      return (
        refState.isDisplaySuggest &&
        refState.isExistList &&
        (refState.isFocus || refState.isHover)
      );
    });

    watch(
      () => refState.value,
      () => {
        emitValue(refState.value);
      }
    );

    watch(
      () => props.value,
      () => {
        refState.errorMessage = props.errorMessage;
      }
    );

    watch(
      () => props.errorMessage,
      () => {
        refState.errorMessage = props.errorMessage;
      }
    );

    return {
      refState,
      judgeDisplay,
      emitValue,
    };
  },
});
</script>
