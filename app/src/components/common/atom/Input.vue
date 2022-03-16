<template>
  <div>
    <!-- テキストエリア -->
    <textarea
      v-if="inputType === 'textarea'"
      type="text"
      class="form-control"
      :class="{
        'is-valid-textbox': !refState.isError && refState.isNotInit,
        'is-invalid-textbox': refState.isError && refState.isNotInit,
      }"
      v-model="refState.value"
      @focus="onFocus"
      @blur="unFocus"
    />

    <!-- 日付入力 -->
    <div
      v-else-if="inputType === 'date'"
      :class="{
        'is-valid-textbox': !refState.isError && refState.isNotInit,
        'is-invalid-textbox': refState.isError && refState.isNotInit,
      }"
      class="date-form form-control"
    >
      <input
        type="tel"
        maxlength="4"
        class="input-year"
        placeholder="1990"
        @input="checkInputYear"
        v-model="refState.date.year"
      />/
      <input
        type="tel"
        maxlength="2"
        class="input-month"
        placeholder="01"
        @input="checkInputMonth"
        v-model="refState.date.month"
      />/
      <input
        type="tel"
        maxlength="2"
        class="input-day"
        placeholder="01"
        @input="checkInputDay"
        v-model="refState.date.day"
      />
    </div>

    <!-- デフォルト入力 -->
    <input
      v-else-if="inputType === 'password'"
      type="password"
      class="form-control"
      :class="{
        'is-valid-textbox': !refState.isError && refState.isNotInit,
        'is-invalid-textbox': refState.isError && refState.isNotInit,
      }"
      v-model="refState.value"
      @focus="onFocus"
      @blur="unFocus"
    />

    <!-- デフォルト入力 -->
    <input
      v-else
      type="text"
      class="form-control"
      :class="{
        'is-valid-textbox': !refState.isError && refState.isNotInit,
        'is-invalid-textbox': refState.isError && refState.isNotInit,
      }"
      v-model="refState.value"
      @focus="onFocus"
      @blur="unFocus"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, watch } from "vue";

/* ***********************************************************************************
型定義
*********************************************************************************** */
interface Date {
  year: string;
  month: string;
  day: string;
}

interface State {
  value: string;
  date: Date;
  isError: boolean;
  isNotInit: boolean;
  isFocus: boolean;
}

export default defineComponent({
  /* ***********************************************************************************
  引数を設定
  *********************************************************************************** */
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
    isError: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    isFocus: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    type: {
      type: String as PropType<string>,
      required: false,
      default: "",
    },
  },

  setup(props, { emit }) {
    /* ***********************************************************************************
    モジュール全体で使う変数の定義
    *********************************************************************************** */
    const refState = reactive<State>({
      value: "",
      date: {
        year: "",
        month: "",
        day: "",
      },
      isError: false,
      isNotInit: false,
      isFocus: false,
    });

    /* ***********************************************************************************
    テキストボックスのタイプをセット
    *********************************************************************************** */
    const getPropsType = () => {
      return props.type;
    };
    const inputType = getPropsType();

    /* ***********************************************************************************
    テキストを年、月、日を分割する
    *********************************************************************************** */
    const splitDate = () => {
      const aryDate = refState.value.split("/");
      refState.date.year = aryDate[0];
      refState.date.month = aryDate[1];
      refState.date.day = aryDate[2];
    };

    /* ***********************************************************************************
    生年月日に入力された文字が数字かどうかチェックし、数字以外であれば入力できないようにする
    *********************************************************************************** */
    const checkInputYear = () => {
      refState.date.year = replaceStringToEmpty(refState.date.year);
    };

    const checkInputMonth = () => {
      refState.date.month = replaceStringToEmpty(refState.date.month);
    };

    const checkInputDay = () => {
      refState.date.day = replaceStringToEmpty(refState.date.day);
    };

    const replaceStringToEmpty = (checkTarget: string) => {
      const regex = new RegExp("[^0-9]");
      return checkTarget.replace(regex, "");
    };

    /* ***********************************************************************************
    テキストボックスの値に引数をセット
    *********************************************************************************** */
    const setValue = () => {
      refState.value = props.value;
      if (inputType === "date") {
        splitDate();
      }
    };

    setValue();

    /* ***********************************************************************************
    年、月、日をマージする
    *********************************************************************************** */
    const mergeDate = () => {
      const year = escape(refState.date.year);
      const month = escape(refState.date.month);
      const day = escape(refState.date.day);
      return year + "/" + month + "/" + day;
    };

    /* ***********************************************************************************
    テキストボックスのフォーカス
    *********************************************************************************** */
    const onFocus = () => {
      refState.isFocus = true;
    };

    const unFocus = () => {
      refState.isFocus = false;
    };

    /* ***********************************************************************************
    監視プロパティ
    *********************************************************************************** */
    //テキストボックスに入力された値を親に渡す
    watch(
      () => refState.value,
      () => {
        /*
        入力欄が日付の入力欄の場合、日付をマージした値を親コンポーネントに渡す。
        そうでない場合、テキストボックスに入力された値をそのまま渡す
        */
        emit(
          "update:value",
          inputType === "date" ? mergeDate() : refState.value
        );
        refState.isNotInit = true;
      }
    );

    //テキストボックスを選択したかどうかを親に渡す
    watch(
      () => refState.isFocus,
      () => {
        emit("update:isFocus", refState.isFocus);
      }
    );

    /* ***********************************************************************************
    監視プロパティ このモジュールで使用する変数に引数から値をセット
    *********************************************************************************** */
    //バリデーションの結果を取得
    watch(
      () => props.isError,
      () => {
        refState.isError = props.isError;
        refState.isNotInit = true;
      }
    );

    //テキストボックスにセットする値を取得
    watch(
      () => props.value,
      () => {
        setValue();
      }
    );

    return {
      refState,
      inputType,
      onFocus,
      unFocus,
      checkInputYear,
      checkInputMonth,
      checkInputDay,
    };
  },
});
</script>

<style>
.date-form {
  width: 160px;
  padding: 6px 12px;
}

.date-form input {
  border: none;
  text-align: right;
}

.input-year {
  width: 50px;
  text-align: right;
}

.input-month {
  width: 25px;
  text-align: right;
}

.input-day {
  width: 25px;
  text-align: right;
}
</style>
