<template>
  <div class="contents">
    <div id="header">
      <Header></Header>
    </div>
    <div class="main-contents mt-3">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Header from "../components/adminPage/Header.vue";
export default {
  components: {
    Header,
  },
};
</script>
