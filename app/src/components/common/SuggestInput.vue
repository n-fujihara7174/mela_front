<template>
  <div class="dropdown">
    <input
      type="text"
      class="form-control dropdown-toggle"
      :class="{
        'is-valid-textbox':
          !isInvalid(refState.errorMessage) && refState.isNotInit,
        'is-invalid-textbox':
          isInvalid(refState.errorMessage) && refState.isNotInit,
      }"
      v-model="refState.inputValue"
      @input="listFilter(refState.inputValue)"
      @focus="onFocus"
      @blur="unFocus"
    />
    <div v-show="isDisplay" class="dropdown-menu" :size="listSize">
      <option
        class="dropdown-item"
        v-for="(element, index) in refState.filteredList"
        :key="index"
        :mouseleave="mouseLeave"
        @click="setInputValue(element)"
        @mouseover="mouseover"
        @mouseleave="mouseLeave"
      >
        {{ element }}
      </option>
    </div>
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
  errorMessage: string;
  isFocus: boolean;
  isHover: boolean;
  isNotInit: boolean;
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
    errorMessage: {
      type: String as PropType<string>,
      required: true,
    },
    isNotInit: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    placeholder: {
      type: String as PropType<string>,
      required: false,
    },
  },

  setup(props, { emit }) {
    const refState = reactive<State>({
      filteredList: [],
      inputValue: "",
      errorMessage: "",
      isFocus: false,
      isHover: false,
      isNotInit: false,
    });

    onMounted(() => {
      refState.inputValue = props.value;
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

    //サジェストで選択した値をテキストボックスにセット
    const setInputValue = (selectValue: string) => {
      refState.inputValue = selectValue;
      listFilter(selectValue);
    };

    watch(
      () => refState.inputValue,
      () => {
        emit("update:value", refState.inputValue);
      }
    );

    watch(
      () => props.value,
      () => {
        refState.inputValue = props.value;
      }
    );

    watch(
      () => props.errorMessage,
      () => {
        refState.errorMessage = props.value;
      }
    );

    watch(
      () => props.isNotInit,
      () => {
        refState.isNotInit = props.isNotInit;
      }
    );

    watch(
      () => props.isNotInit,
      () => {
        refState.isNotInit = props.isNotInit;
      }
    );

    const isDisplay = computed(() => {
      return (
        (refState.isFocus || refState.isHover) &&
        refState.filteredList.length != 0
      );
    });

    /*
       pulldownで要素を表示する個数を算出
       サジェストのリストの要素が1つであれば、2を返却（2にしないとプルダウンの選択肢として表示されない)
       2から10であれば、要素数そのままの個数を返却
       10以上であれば、10を返却
    */
    const listSize = computed(() => {
      let size = 0;
      const filterSize = refState.filteredList.length;

      size = filterSize === 1 ? 2 : filterSize;
      size = filterSize > 10 ? 10 : filterSize;

      return size;
    });

    const isInvalid = (errorMesssage: string) => {
      return !!errorMesssage;
    };

    return {
      refState,
      listFilter,
      onFocus,
      unFocus,
      mouseover,
      mouseLeave,
      setInputValue,
      isDisplay,
      listSize,
      isInvalid,
    };
  },
});
</script>

<style scoped>
.dropdown-menu {
  display: block;
  width: 100%;
}
</style>
