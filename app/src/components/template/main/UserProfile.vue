<template>
  <div>
    <div class="max-w-2xl mx-auto">
      <div class="px-3 py-2">
        <div class="flex flex-col gap-1 text-center">
          <a
            class="block mx-auto bg-center bg-no-repeat bg-cover w-20 h-20 rounded-full shadow-lg"
            href=""
            ><img
              src="@/assets/459412C0-F0CA-4B3C-AEC7-292375082F5E.jpeg"
              alt=""
              class="mx-auto bg-center bg-no-repeat bg-cover w-20 h-20 rounded-full shadow-lg"
          /></a>
          <p class="font-serif font-semibold">naoki.fujihara</p>
        </div>

        <div class="flex justify-center items-center gap-2 my-3">
          <div class="font-semibold text-center mx-4">
            <p class="text-black">102</p>
            <span class="text-gray-400">Posts</span>
          </div>
          <div class="font-semibold text-center mx-4">
            <p class="text-black">102</p>
            <span class="text-gray-400">Followers</span>
          </div>
          <div class="font-semibold text-center mx-4">
            <p class="text-black">102</p>
            <span class="text-gray-400">Folowing</span>
          </div>
        </div>

        <div class="flex justify-center gap-2 my-5">
          <button
            class="bg-pink-500 px-10 py-2 rounded-full text-white shadow-lg"
          >
            Follow
          </button>
        </div>
      </div>
    </div>
    <div>
      <Top></Top>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Top from "@/components/template/main/Main.vue";

export default defineComponent({
  components: {
    Top: Top,
  },
});
</script>