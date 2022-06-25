/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { InjectionKey } from "vue";
import { createStore, Store, useStore as baseUseStore } from "vuex";
import * as MutationName from "./mutationName";

// stateの型定義
type State = {
  isShowModal: boolean;
};

// storeをprovide/injectするためのキー
export const key: InjectionKey<Store<State>> = Symbol();

// store本体
export const store = createStore<State>({
  state: {
    isShowModal: false,
  },
  mutations: {
    [MutationName.IS_SHOW_MODAL](state) {
      state.isShowModal = !state.isShowModal;
    },
  },
});

// useStoreを使う時にキーの指定を省略するためのラッパー関数
export const useStore = () => {
  return baseUseStore(key);
};
