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
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch, onMounted } from "vue";

interface State {
  value: string;
  isError: boolean;
  isNotInit: boolean;
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
    });

    onMounted(() => {
      refState.value = props.value;
    });

    const getPropsIsTextarea = () => {
      return props.isTextarea;
    };
    const isTextareaFlag = getPropsIsTextarea();

    watch(
      () => refState.value,
      () => {
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

    return { refState, isTextareaFlag };
  },
});
</script>
