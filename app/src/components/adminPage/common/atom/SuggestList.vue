<template>
  <div class="dropdown">
    <div class="dropdown-menu" :size="listSize">
      <option
        class="dropdown-item"
        v-for="(element, index) in refState.filteredList"
        :key="index"
        @click="emitValue(element)"
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
  computed,
  watchEffect,
} from "vue";

interface State {
  value: string;
  filteredList: string[];
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
  },

  setup(props, { emit }) {
    const refState = reactive<State>({
      value: "",
      filteredList: [],
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

    const emitValue = (value: string) => {
      emit("update:value", value);
    };

    watchEffect(() => {
      listFilter(props.value);
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

    return {
      refState,
      emitValue,
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
