<template>
  <div><Header></Header></div>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/template/header/Header.vue";

export default defineComponent({
  components: {
    Header: Header,
  },
});
</script>
