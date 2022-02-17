<template>
  <div class="dropdown">
    <!-- <input
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
    /> -->
    <div v-show="isDisplay" class="dropdown-menu" :size="listSize">
      <option
        class="dropdown-item"
        v-for="(element, index) in refState.filteredList"
        :key="index"
        :mouseleave="mouseLeave"
        @click="emitValue(element)"
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
  value: string;
}

export default defineComponent({
  props: {
    list: {
      type: Array as PropType<string[]>,
      required: true,
    },
  },

  setup(props, { emit }) {
    const refState = reactive<State>({
      filteredList: [],
      value: "",
    });

    onMounted(() => {
      refState.value = props.value;
      listFilter(refState.value);
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

    // const onFocus = () => {
    //   refState.isFocus = true;
    // };

    // const unFocus = () => {
    //   refState.isFocus = false;
    // };

    // const mouseover = () => {
    //   refState.isHover = true;
    // };

    // const mouseLeave = () => {
    //   refState.isHover = false;
    // };

    watch(
      () => refState.value,
      () => {
        emit("update:value", refState.value);
      }
    );

    watch(
      () => props.value,
      () => {
        refState.value = props.value;
      }
    );

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

    return {
      refState,
      listFilter,
      listSize,
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
