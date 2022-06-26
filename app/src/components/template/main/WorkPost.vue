<template>
  <!-- 背景 -->
  <transition
    enter-active-class="animate-fade-in"
    leave-active-class="animate-fade-out"
  >
    <div
      v-show="refState.isShowPostScreen"
      class="fixed w-screen h-screen -mt-20 bg-gray-700/50 flex items-center justify-center z-10"
    >
      <!-- モーダル -->
      <transition
        enter-active-class="animate-slide-in-top"
        leave-active-class="animate-slide-up-top"
      >
        <div
          class="rounded-lg bg-white shadow-lg p-2 w-1/2 h-4/5"
          v-show="refState.isShowModal"
        >
          <!-- モーダル閉じるボタン -->
          <div class="flex justify-end">
            <button class="w-6 h-6 bg-red-600 rounded-full" @click="closeModal">
              <img src="@/assets/cancel.svg" alt="" />
            </button>
          </div>

          <!-- モーダルタイトル -->
          <div class="flex justify-center">
            <h1 class="text-3xl font-bold text-green-600">写真投稿</h1>
          </div>

          <!-- メイン画像 -->
          <div class="flex justify-center h-3/5">
            <div
              class="flex justify-center items-center w-5/6 h-full"
              :class="
                refState.displayImage === ''
                  ? 'border border-solid border-green-600 rounded-lg'
                  : ''
              "
            >
              <img
                :src="refState.displayImage"
                alt="画像を選択してください"
                class="object-scale-down"
              />
            </div>
          </div>

          <!-- 画像選択 -->
          <div
            v-show="refState.postData.imageArray.length === 0"
            class="text-center mt-2"
          >
            <div class="pt-5 flex justify-center">
              <div class="flex justify-around">
                <div
                  v-for="(image, key) in refState.postData.imageArray"
                  :key="key"
                  class="w-24 mx-2"
                >
                  <img
                    :src="image"
                    alt=""
                    class="h-24 object-cover"
                    :class="{
                      'border-solid border-2 border-green-600':
                        image === refState.displayImage,
                    }"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-center mt-8">
            <button
              class="text-white py-2 px-4 rounded-lg bg-purple-700 hover:bg-purple-600 shadow-md font-medium transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, watch } from "vue";

export interface PostData {
  postContents: string;
  imageArray: string[];
  mainImage: string;
  subImage_1: string;
  subImage_2: string;
  subImage_3: string;
}

export interface State {
  postData: PostData;
  isShowPostScreen: boolean;
  isShowModal: boolean;
  displayImage: string;
}

export default defineComponent({
  props: {
    isShowModal: {
      type: Boolean as PropType<boolean>,
    },
  },
  setup(props, { emit }) {
    const postData: PostData = {
      postContents: "",
      imageArray: [],
      mainImage: "",
      subImage_1: "",
      subImage_2: "",
      subImage_3: "",
    };

    const refState = reactive<State>({
      postData: postData,
      isShowPostScreen: false,
      isShowModal: false,
      displayImage: "",
    });

    //const setInOutAnimation = () => {};

    // イベントハンドルする関数なので、イベントの変更を検知できる
    // このイベントにてファイル情報を取得している
    const previewImage = (e: Event) => {
      e.preventDefault();
      if (e.target instanceof HTMLInputElement && e.target.files) {
        postData.imageArray.push(URL.createObjectURL(e.target.files[0]));
      }
    };

    //const imageArray = Object.values(refState.postData.imageArray[0]);

    // const selectImage = (index: number) => {
    //   refState.displayImage = imageArray[index];
    // };

    const closeModal = () => {
      refState.isShowModal = false;
      emit("update:isShowModal", refState.isShowModal);
    };

    const setBorder = () => {
      if (refState.displayImage === "") {
        console.log("true側");
        return "border border-solid border-green-600 rounded-lg";
      } else {
        console.log("false側");
        return "";
      }
    };

    watch(
      () => props.isShowModal,
      () => {
        refState.isShowModal = props.isShowModal || false;
        refState.isShowPostScreen = props.isShowModal || false;
      }
    );

    return {
      refState,
      closeModal,
      previewImage,
      setBorder,
      //selectImage,
    };
  },
});
</script>
