<template>
  <div>
    <InputColumn
      v-model:value="refState.value"
      :isError="!!refState.errorMessage"
      :isTextarea="refState.isTextarea"
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
import {
  defineComponent,
  PropType,
  reactive,
  onMounted,
  watch,
  computed,
} from "vue";

import ErrorMessageLabel from "@/components/adminPage/common/atom/ErrorLabel.vue";
import InputColumn from "@/components/adminPage/common/atom/Input.vue";
import SuggestList from "@/components/adminPage/common/atom/SuggestList.vue";

interface State {
  value: string;
  errorMessage: string;
  list: string[];
  isTextarea: boolean;
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
      isExistList: false,
    });

    onMounted(() => {
      refState.value = props.value;
      refState.list = props.list;
      refState.isTextarea = props.isTextarea;
      refState.isDisplaySuggest = !!props.list.length;
    });

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
