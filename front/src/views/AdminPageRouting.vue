<template>
  <div class="contents">
    <div id="header">
      <Header></Header>
    </div>
    <div class="main-contents">
      <router-view />
    </div>
  </div>
</template>

<script>
import Header from '../components/adminPage/Header.vue'

export default {
  components: {
    Header
  }
}
</script>
