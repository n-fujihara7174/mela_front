<template>
  <div class="header nav justify-content-center container">
    <div class="row">
      <div class="col-auto">
        <label @click="goToUser">ユーザー</label>
      </div>
      <div class="col-auto">
        <label @click="goToBookIndex"></label>
      </div>
      <div class="col-auto">
        <label>◯◯</label>
      </div>
      <div class="col-auto">
        <label>□□</label>
      </div>
      <div class="col-auto">
        <label>△△</label>
      </div>
    </div>
  </div>
</template>

<style>
.header {
  height: 5vh;
}
</style>