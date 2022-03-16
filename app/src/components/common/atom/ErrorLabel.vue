<template>
  <div>
    <label
      :class="{
        'display-none': judgeDisplay(refState.errorMessage),
        'is-valid': !isInvalid(refState.errorMessage),
        'is-invalid': isInvalid(refState.errorMessage),
      }"
      >{{ refState.errorMessage }}</label
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch } from "vue";

interface State {
  errorMessage: string;
}

export default defineComponent({
  props: {
    errorMessage: {
      type: String as PropType<string>,
      required: true,
    },
  },

  setup(props) {
    const refState = reactive<State>({
      errorMessage: "",
    });

    watch(
      () => props.errorMessage,
      () => {
        refState.errorMessage = props.errorMessage;
      }
    );

    const judgeDisplay = (displayText: string) => {
      const isDisplay = !!displayText;
      return !isDisplay;
    };

    const isInvalid = (errorMesssage: string) => {
      return !!errorMesssage;
    };

    return { refState, judgeDisplay, isInvalid };
  },
});
</script>
