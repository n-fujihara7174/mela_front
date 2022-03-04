<template>
  <div>
    <textarea
      v-if="inputType === 'textarea'"
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
    type: {
      type: String as PropType<string>,
      required: false,
      default: "",
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

    const getPropsType = () => {
      console.log("props : " + props.type);
      return props.type;
    };
    const inputType = getPropsType();

    const onFocus = () => {
      refState.isFocus = true;
    };

    const unFocus = () => {
      refState.isFocus = false;
    };

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

    watch(
      () => refState.isFocus,
      () => {
        emit("update:isFocus", refState.isFocus);
      }
    );

    return { refState, inputType, onFocus, unFocus };
  },
});
</script>
