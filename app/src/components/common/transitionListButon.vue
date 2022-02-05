<template>
  <div>
    <button
      v-if="isButton"
      type="button"
      class="btn btn-primary create-user-btn"
      @click="transitionList"
    >
      {{ displayText }}
    </button>
    <a v-else href="#" @click="transitionList">{{ displayText }}</a>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  props: {
    text: {
      type: String as PropType<string>,
      required: true,
    },
    transitionDestination: {
      type: String as PropType<string>,
      required: true,
    },
    displayType: {
      type: String as PropType<string>,
      required: false,
      default: "link",
    },
  },

  setup(props) {
    const router = useRouter();
    const transitionList = (): void => {
      router.push({
        name: props.transitionDestination,
      });
    };

    const getDisplayType = () => {
      return props.displayType === "button";
    };
    const isButton = getDisplayType();

    const getText = () => {
      return props.text;
    };
    const displayText = getText();

    return { transitionList, isButton, displayText };
  },
});
</script>
