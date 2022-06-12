<template>
  <div class="flex">
    <!-- image section  -->
    <div class="w-7/12 pt-10">
      <!-- main image -->
      <div class="h-128 flex justify-center">
        <img
          :src="importImage(refState.displayImage)"
          alt=""
          class="w-10/12 object-scale-down"
        />
      </div>

      <!-- image select -->
      <div class="pt-5 flex justify-center">
        <div class="flex justify-around">
          <div
            v-for="(image, key, index) in refState.imageList"
            :key="key"
            class="w-24 mx-2"
          >
            <img
              :src="importImage(image)"
              alt=""
              class="h-24 object-cover"
              :class="{
                'border-solid border-2 border-green-600':
                  image === refState.displayImage,
              }"
              @click="selectImage(index)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- detail info section -->
    <div class="w-4/12 pt-10">
      <div class="flex flex-col md:flex-row -mx-4 h-64">
        <div class="md:flex-1 px-4">
          <h2
            class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl"
          >
            メロンちゃんの画像
          </h2>
          <p class="text-gray-500 text-sm">
            By
            <a href="#" class="text-indigo-600 hover:underline">n-fujihara </a>
          </p>
          <p class="text-gray-500 pt-5">
            うちで飼育しているクランウェルツノガエルのメロンちゃんです。
          </p>
        </div>
      </div>
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
    </div>
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

    const selectImage = (index: number) => {
      console.log("index:" + index);
      refState.displayImage = imageArray[index];
    };

    const importImage = (imagePath: string) => {
      return require("@/assets/" + imagePath);
    };

    return {
      refState,
      importImage,
      selectImage,
    };
  },
});
</script>
