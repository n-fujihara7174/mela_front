<template>
  <div>
    <!-- 投稿モーダル -->
    <workPost v-model:isShowModal="refState.isShowWorkPostModal"></workPost>

    <!-- メインコンテンツ -->
    <div>
      <div class="photos p-4">
        <!-- 一つのコンテンツ -->
        <div class="overflow-hidden shadow-lg rounded-lg cursor-pointer mb-4">
          <a href="#" class="w-full block" @click="toDetail">
            <img
              src="@/assets/1BCD5A44-7493-40F9-810C-5D702DF37948.jpeg"
              alt=""
              class="w-full"
            />
            <div class="bg-white w-full p-4">
              <div class="mb-2">
                <p class="text-gray-800 text-xl font-medium">
                  メロンちゃんの画像
                </p>
                <p class="text-gray-500 text-sm">
                  By
                  <a href="#" class="text-indigo-600 hover:underline"
                    >n-fujihara
                  </a>
                </p>
              </div>
              <p class="text-gray-400 font-light text-md">
                The new supermac is here, 543 cv and 140 000$. This is best
                racing computer about 7 years on...
              </p>
            </div>
          </a>
        </div>

        <!-- 一つののコンテンツ -->
        <div class="overflow-hidden shadow-lg rounded-lg cursor-pointer mb-4">
          <a href="#" class="w-full block" @click="toDetail">
            <img src="@/assets/22652726_l.jpg" alt="" class="w-full" />
            <div class="bg-white w-full p-4">
              <p class="text-gray-800 text-xl font-medium mb-2">
                New Mac is here !
              </p>
              <p class="text-gray-400 font-light text-md">
                The new supermac is here, 543 cv and 140 000$. This is best
                racing computer about 7 years on...
              </p>
            </div>
          </a>
        </div>
        <div class="overflow-hidden shadow-lg rounded-lg cursor-pointer mb-4">
          <a href="#" class="w-full block" @click="toDetail">
            <img
              src="@/assets/459412C0-F0CA-4B3C-AEC7-292375082F5E.jpeg"
              alt=""
              class="w-full"
            />
            <div class="bg-white w-full p-4">
              <p class="text-gray-800 text-xl font-medium mb-2">
                New Mac is here !
              </p>
              <p class="text-gray-400 font-light text-md">
                The new supermac is here, 543 cv and 140 000$. This is best
                racing computer about 7 years on...
              </p>
            </div>
          </a>
        </div>
        <div class="overflow-hidden shadow-lg rounded-lg cursor-pointer mb-4">
          <a href="#" class="w-full block" @click="toDetail">
            <img
              src="@/assets/70530182-F7B7-4017-8E91-82891357514D.jpeg"
              alt=""
              class="w-full"
            />
            <div class="bg-white w-full p-4">
              <p class="text-gray-800 text-xl font-medium mb-2">
                New Mac is here !
              </p>
              <p class="text-gray-400 font-light text-md">
                The new supermac is here, 543 cv and 140 000$. This is best
                racing computer about 7 years on...
              </p>
            </div>
          </a>
        </div>
        <div class="overflow-hidden shadow-lg rounded-lg cursor-pointer mb-4">
          <a href="#" class="w-full block" @click="toDetail">
            <img src="@/assets/background_00024.jpeg" alt="" class="w-full" />
            <div class="bg-white w-full p-4">
              <p class="text-gray-800 text-xl font-medium mb-2">
                New Mac is here !
              </p>
              <p class="text-gray-400 font-light text-md">
                The new supermac is here, 543 cv and 140 000$. This is best
                racing computer about 7 years on...
              </p>
            </div>
          </a>
        </div>
        <div class="overflow-hidden shadow-lg rounded-lg cursor-pointer mb-4">
          <a href="#" class="w-full block" @click="toDetail">
            <img
              src="@/assets/D85E77DD-3A38-4238-B2F2-4A685BF44E75.jpeg"
              alt=""
              class="w-full"
            />
            <div class="bg-white w-full p-4">
              <p class="text-gray-800 text-xl font-medium mb-2">
                New Mac is here !
              </p>
              <p class="text-gray-400 font-light text-md">
                The new supermac is here, 543 cv and 140 000$. This is best
                racing computer about 7 years on...
              </p>
            </div>
          </a>
        </div>
        <div class="overflow-hidden shadow-lg rounded-lg cursor-pointer mb-4">
          <a href="#" class="w-full block" @click="toDetail">
            <img
              src="@/assets/EE4BB711-17D7-4FFE-B974-E10B34840B8C.jpeg"
              alt=""
              class="w-full"
            />
            <div class="bg-white w-full p-4">
              <p class="text-gray-800 text-xl font-medium mb-2">
                New Mac is here !
              </p>
              <p class="text-gray-400 font-light text-md">
                The new supermac is here, 543 cv and 140 000$. This is best
                racing computer about 7 years on...
              </p>
            </div>
          </a>
        </div>
        <div class="overflow-hidden shadow-lg rounded-lg cursor-pointer mb-4">
          <a href="#" class="w-full block" @click="toDetail">
            <img
              src="@/assets/EE5C82CE-3669-479A-9639-243211AE6430.jpeg"
              alt=""
              class="w-full"
            />
            <div class="bg-white w-full p-4">
              <p class="text-gray-800 text-xl font-medium mb-2">
                New Mac is here !
              </p>
              <p class="text-gray-400 font-light text-md">
                The new supermac is here, 543 cv and 140 000$. This is best
                racing computer about 7 years on...
              </p>
            </div>
          </a>
        </div>
        <div class="overflow-hidden shadow-lg rounded-lg cursor-pointer mb-4">
          <a href="#" class="w-full block" @click="toDetail">
            <img src="@/assets/IMG_0629.jpeg" alt="" class="w-full" />
            <div class="bg-white w-full p-4">
              <p class="text-gray-800 text-xl font-medium mb-2">
                New Mac is here !
              </p>
              <p class="text-gray-400 font-light text-md">
                The new supermac is here, 543 cv and 140 000$. This is best
                racing computer about 7 years on...
              </p>
            </div>
          </a>
        </div>
        <div class="overflow-hidden shadow-lg rounded-lg cursor-pointer mb-4">
          <a href="#" class="w-full block" @click="toDetail">
            <img src="@/assets/IMG_0695.jpeg" alt="" class="w-full" />
            <div class="bg-white w-full p-4">
              <p class="text-gray-800 text-xl font-medium mb-2">
                New Mac is here !
              </p>
              <p class="text-gray-400 font-light text-md">
                The new supermac is here, 543 cv and 140 000$. This is best
                racing computer about 7 years on...
              </p>
            </div>
          </a>
        </div>
        <div class="overflow-hidden shadow-lg rounded-lg cursor-pointer mb-4">
          <a href="#" class="w-full block" @click="toDetail">
            <img src="@/assets/メロンちゃん.png" alt="" class="w-full" />
            <div class="bg-white w-full p-4">
              <p class="text-gray-800 text-xl font-medium mb-2">
                New Mac is here !
              </p>
              <p class="text-gray-400 font-light text-md">
                The new supermac is here, 543 cv and 140 000$. This is best
                racing computer about 7 years on...
              </p>
            </div>
          </a>
        </div>
      </div>

      <!-- 投稿ボタン -->
      <div class="fixed bottom-4 right-4 z-0">
        <button
          class="rounded-full bg-green-600 w-20 h-20"
          @click="switchShowWorkPostModal"
        >
          <img src="@/assets/plus.svg" alt="" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import WorkPost from "@/components/template/main/WorkPost.vue";
import { screenTransition } from "@/composables/common/ScreenTransition";

interface State {
  isShowWorkPostModal: boolean;
}

export default defineComponent({
  components: { workPost: WorkPost },
  setup() {
    const { toDetail } = screenTransition();

    const refState = reactive<State>({
      isShowWorkPostModal: false,
    });

    const switchShowWorkPostModal = () => {
      refState.isShowWorkPostModal = !refState.isShowWorkPostModal;
    };

    return { refState, toDetail, switchShowWorkPostModal };
  },
});
</script>

<style scoped>
.photos {
  -webkit-column-count: 4;
  -moz-column-count: 4;
  column-count: 4;
}
</style>
