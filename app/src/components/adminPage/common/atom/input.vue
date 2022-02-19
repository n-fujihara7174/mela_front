<template>
  <div>
    <textarea
      v-if="isTextarea"
      type="text"
      class="form-control"
      :class="{
        'is-valid-textbox': !refState.isError && refState.isNotInit,
        'is-invalid-textbox': refState.isError && refState.isNotInit,
      }"
      v-model="refState.value"
      @focus="onFocus"
      @blur="unFocus"
    />
    <input
      v-else
      type="text"
      class="form-control"
      :class="{
        'is-valid-textbox': !refState.isError && refState.isNotInit,
        'is-invalid-textbox': refState.isError && refState.isNotInit,
      }"
      v-model="refState.value"
      @focus="onFocus"
      @blur="unFocus"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch, onMounted } from "vue";

interface State {
  value: string;
  isError: boolean;
  isNotInit: boolean;
  isFocus: boolean;
}

export default defineComponent({
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
    isError: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    isFocus: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    isTextarea: {
      type: Boolean as PropType<boolean>,
      required: false,
      default: false,
    },
  },

  setup(props, { emit }) {
    const refState = reactive<State>({
      value: "",
      isError: false,
      isNotInit: false,
      isFocus: false,
    });

    onMounted(() => {
      refState.value = props.value;
    });

    const getPropsIsTextarea = () => {
      return props.isTextarea;
    };
    const isTextareaFlag = getPropsIsTextarea();

    const onFocus = () => {
      console.log("inputfieldのonfocus");
      refState.isFocus = true;
    };

    const unFocus = () => {
      refState.isFocus = false;
    };

    watch(
      () => refState.value,
      () => {
        console.log("inputのrefState.valueのwatch");
        emit("update:value", refState.value);
        refState.isNotInit = true;
      }
    );

    watch(
      () => props.isError,
      () => {
        refState.isError = props.isError;
      }
    );

    watch(
      () => props.value,
      () => {
        refState.value = props.value;
      }
    );

    watch(
      () => refState.isFocus,
      () => {
        emit("update:isFocus", refState.isFocus);
      }
    );

    return { refState, isTextareaFlag, onFocus, unFocus };
  },
});
</script>
