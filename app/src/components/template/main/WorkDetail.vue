<template>
  <div>
    <div class="bg-gray-800 w-full py-10 flex justify-center">
      <div class="w-1/12 grid place-items-center">
        <div
          v-if="refState.imageIndex !== 0"
          class="w-16 h-16 rounded-full grid place-items-center"
          :class="{ 'bg-gray-600': refState.mouseover_left_arrow }"
          @mouseover="mouseover_left_arrow"
          @mouseleave="mouseleave_left_arrow"
          @click="preImage"
        >
          <div class="w-8">
            <img src="@/assets/左矢印.svg" alt="" />
          </div>
        </div>
        <div v-else></div>
      </div>
      <div class="w-1/2">
        <img
          :src="importImage(refState.displayImage)"
          alt=""
          class="w-full h-full"
        />
      </div>
      <div class="w-1/12 grid place-items-center">
        <div
          v-if="refState.imageIndex !== 3"
          class="w-16 h-16 rounded-full grid place-items-center"
          :class="{ 'bg-gray-600': refState.mouseover_right_arrow }"
          @mouseover="mouseover_right_arrow"
          @mouseleave="mouseleave_right_arrow"
          @click="nextImage"
        >
          <div class="w-8">
            <img src="@/assets/右矢印.svg" alt="" class="rotate-45" />
          </div>
        </div>
        <div v-else></div>
      </div>
    </div>

    <div class="bg-gray-800 w-full py-10 flex justify-center">
      <div class="w-1/2">
        <div class="flex justify-around">
          <img
            v-for="(image, index) in refState.imageList"
            :key="index"
            :src="importImage(image)"
            alt=""
            class="w-1/6"
            :class="{
              'border-solid border-8 border-green-600':
                image === refState.displayImage,
            }"
          />
        </div>
      </div>
    </div>

    <div class="flex justify-center pt-20 pb-96">
      <div class="flex justify-around w-8/12">
        <div class="w-5/12 rounded overflow-hidden shadow-lg p-5">
          <div class="flex justify-between">
            <div>
              <img
                src="@/assets/ユーザーアイコン.svg"
                alt=""
                class="w-10 h-10 rounded-full mr-4 inline-block"
              />
              <span class="align-middle font-bold text-xl mb-2"
                >naoki.fujihara</span
              >
            </div>
            <div>
              <button
                type="button"
                class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800 inline-block"
              >
                フォロー
              </button>
            </div>
          </div>
          <div class="mt-4">
            ポートフォリオを作成しています。<br />
            普段はゲームをしています
          </div>
          <div class="px-6 py-4 text-right"></div>
        </div>
        <div class="p-5">
          <div class="">
            <button
              class="text-white px-4 w-auto h-10 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
            >
              <svg
                viewBox="0 0 20 20"
                enable-background="new 0 0 20 20"
                class="w-6 h-6 inline-block mr-1"
              >
                <path
                  fill="#FFFFFF"
                  d="M17.19,4.155c-1.672-1.534-4.383-1.534-6.055,0L10,5.197L8.864,4.155c-1.672-1.534-4.382-1.534-6.054,0
                                    c-1.881,1.727-1.881,4.52,0,6.246L10,17l7.19-6.599C19.07,8.675,19.07,5.881,17.19,4.155z"
                />
              </svg>
              <span>好き!</span>
            </button>
          </div>
          <div class="mt-5">
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >#クランウェルツノガエル</span
            >
            <span
              class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >#テラリウム</span
            >
          </div>
          <div>
            {{ refState.contents }}
          </div>
        </div>
      </div>
    </div>
    <img src="1BCD5A44-7493-40F9-810C-5D702DF37948.jpeg" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

interface ImageList {
  mainImage: string;
  subImage1: string;
  subImage2: string;
  subImage3: string;
}

interface State {
  imageList: ImageList;
  contents: string;
  displayImage: string;
  mouseover_right_arrow: boolean;
  mouseover_left_arrow: boolean;
  imageIndex: number;
}

export default defineComponent({
  setup() {
    const refState = reactive<State>({
      imageList: {
        mainImage: `1BCD5A44-7493-40F9-810C-5D702DF37948.jpeg`,
        subImage1: `459412C0-F0CA-4B3C-AEC7-292375082F5E.jpeg`,
        subImage2: `IMG_0695.jpeg`,
        subImage3: `background_00024.jpeg`,
      },
      contents: "テスト内容",
      displayImage: `1BCD5A44-7493-40F9-810C-5D702DF37948.jpeg`,
      mouseover_right_arrow: false,
      mouseover_left_arrow: false,
      imageIndex: 0,
    });

    const imageArray = Object.values(refState.imageList);
    console.log(imageArray);

    const nextImage = () => {
      refState.imageIndex += 1;
      refState.displayImage = imageArray[refState.imageIndex];
    };

    const preImage = () => {
      refState.imageIndex -= 1;
      refState.displayImage = imageArray[refState.imageIndex];
    };

    const mouseover_left_arrow = () => {
      console.log("mouseover_left_arrow");
      refState.mouseover_left_arrow = true;
    };

    const mouseover_right_arrow = () => {
      refState.mouseover_right_arrow = true;
    };

    const mouseleave_left_arrow = () => {
      refState.mouseover_left_arrow = false;
    };

    const mouseleave_right_arrow = () => {
      refState.mouseover_right_arrow = false;
    };

    const importImage = (imagePath: string) => {
      return require("@/assets/" + imagePath);
    };

    return {
      refState,
      importImage,
      nextImage,
      preImage,
      mouseover_left_arrow,
      mouseover_right_arrow,
      mouseleave_left_arrow,
      mouseleave_right_arrow,
    };
  },
});
</script>
