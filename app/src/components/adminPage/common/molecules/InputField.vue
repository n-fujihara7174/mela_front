<template>
  <InputColumn
    :value="refState.value"
    @input="listFilter(refState.inputValue)"
    @focus="onFocus"
    @blur="unFocus"
  ></InputColumn>
  <SuggestList :list="refState.filteredList"></SuggestList>
  <ErrorMessageLabel
    v-model:errorMessage="refState.error_message.user"
  ></ErrorMessageLabel>
  <!-- <SuggestList
    v-model:value="refState.post.unique_user_id"
    :list="userIdList"
    :placeholder="'ユーザー名を入力してください'"
    :errorMessage="refState.error_message.user"
    :isNotInit="refState.isNotInit"
  ></SuggestList> -->
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, onMounted } from "vue";

import ErrorMessageLabel from "@/components/adminPage/common/atom/errorLabel.vue";
import InputColumn from "@/components/adminPage/common/atom/input.vue";
import SuggestList from "@/components/adminPage/common/atom/SuggestList.vue";

interface State {
  filteredList: string[];
  value: string;
  isFocus: boolean;
  isHover: boolean;
}

export default defineComponent({
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
    isTextarea: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
    isError: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    list: {
      type: Array as PropType<string[]>,
      required: false,
      default: () => [],
    },
  },

  components: {
    ErrorMessageLabel: ErrorMessageLabel,
    InputColumn: InputColumn,
    SuggestList: SuggestList,
  },

  setup(props, { emit }) {
    const refState = reactive<State>({
      filteredList: [],
      value: "",
      isFocus: false,
      isHover: false,
    });

    let isTextarea = false;

    onMounted(() => {
      refState.value = props.value;
      listFilter(refState.value);
      isTextarea = props.isTextarea;
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

    const mouseleave = () => {
      refState.isHover = false;
    };

    return {
      isTextarea,
      onFocus,
      unFocus,
      mouseover,
      mouseleave,
    };
  },
});
</script>
