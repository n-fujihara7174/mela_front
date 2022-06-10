<template>
  <div class="grid grid-cols-12">
    <div class="col-start-4 col-span-6 mt-12">
      <p class="text-center text-2xl">投稿画面</p>
      <separater></separater>
    </div>

    <!-- 画像選択 -->
    <div class="col-start-4 col-span-6 mt-12">
      <p class="text-center text-2xl">画像選択</p>
      <div class="flex justify-center">
        <div
          class="w-72 h-72 border-t-2 border-l-2 border-b border-r border-solid border-green-500 rounded-tl-lg bg-white"
        >
          <img
            v-if="Boolean(postData.main_image)"
            :src="postData.main_image"
            class="w-full h-full border-none rounded-r-none rounded-b-none rounded-tl-lg"
          />
          <label v-else for="">メイン画像</label>
        </div>
        <div
          class="w-72 h-72 border-t-2 border-l border-b border-r-2 border-solid border-green-500 rounded-tr-lg bg-white"
        >
          <img
            v-if="Boolean(postData.sub_image_1)"
            :src="postData.sub_image_1"
            class="w-full h-full border-none rounded-l-none rounded-b-none rounded-tr-lg"
          />
          <label v-else for="">サブ画像1</label>
        </div>
      </div>
      <div class="flex justify-center">
        <div
          class="w-72 h-72 border-t border-l-2 border-b-2 border-r border-solid border-green-500 rounded-bl-lg bg-white"
        >
          <img
            v-if="Boolean(postData.sub_image_2)"
            :src="postData.sub_image_2"
            class="w-full h-full border-none rounded-r-none rounded-t-none rounded-bl-lg"
          />
          <label v-else for="">サブ画像2</label>
        </div>
        <div
          class="w-72 h-72 border-t border-l border-b-2 border-r-2 border-solid border-green-500 rounded-br-lg bg-white"
        >
          <img
            v-if="Boolean(postData.sub_image_3)"
            :src="postData.sub_image_3"
            class="w-full h-full border-none rounded-l-none rounded-t-none rounded-br-lg"
          />
          <label v-else for="">サブ画像3</label>
        </div>
      </div>
      <div class="flex justify-center mt-3 mb-12">
        <!-- forでinputを指定することでラベルをクリックすればinputが作動するようになっている -->
        <label
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          for="file_select"
        >
          画像選択
        </label>
        <!-- typeをfileにするとファイル選択ダイアログが出てくる -->
        <!-- 画像選択時にpreviewImageメソッドを実行 -->
        <input
          type="file"
          id="file_select"
          class="hidden"
          name="image"
          accept="image/png,image/jpeg, image/heic"
          @change="previewImage"
        />
      </div>
      <separater></separater>

      <!-- 投稿内容 -->
      <div class="mt-12 mb-12">
        <p class="text-center text-2xl">投稿内容</p>
        <div class="flex justify-center">
          <div
            class="border-2 border-green-500 rounded-full bg-white px-14 py-1 h-32"
          >
            <textarea
              name=""
              id=""
              cols="60"
              class="resize-none h-28 outline-none"
              v-model="postData.post_contents"
            ></textarea>
          </div>
        </div>
      </div>
      <separater></separater>

      <div class="flex justify-center">
        <div class="p-6">
          <button
            class="bg-gray-300 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded-full w-48 h-12"
          >
            戻る
          </button>
        </div>
        <div class="p-6">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-48 h-12"
          >
            投稿
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import Separater from "@/components/common/atom/SeparaterLine.vue";

export interface PostData {
  post_contents: string;
  main_image: string;
  sub_image_1: string;
  sub_image_2: string;
  sub_image_3: string;
}

export default defineComponent({
  components: {
    Separater: Separater,
  },

  setup() {
    const postData = reactive<PostData>({
      post_contents: "",
      main_image: "",
      sub_image_1: "",
      sub_image_2: "",
      sub_image_3: "",
    });

    // イベントハンドルする関数なので、イベントの変更を検知できる
    // このイベントにてファイル情報を取得している
    const previewImage = (e: Event) => {
      e.preventDefault();
      if (e.target instanceof HTMLInputElement && e.target.files) {
        if (!postData.main_image) {
          postData.main_image = URL.createObjectURL(e.target.files[0]);
        } else if (!postData.sub_image_1) {
          postData.sub_image_1 = URL.createObjectURL(e.target.files[0]);
        } else if (!postData.sub_image_2) {
          postData.sub_image_2 = URL.createObjectURL(e.target.files[0]);
        } else if (!postData.sub_image_3) {
          postData.sub_image_3 = URL.createObjectURL(e.target.files[0]);
        }
      }
    };
    return {
      postData,
      previewImage,
    };
  },
});
</script>
