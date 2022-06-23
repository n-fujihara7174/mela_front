import {
  lengthCheck,
  requireCheck,
  checkDateFormat,
  checkDateValue,
} from "../../src/composables/ValidationCheck";

describe("validationCheck.tsのテスト", () => {
  test("lengthCheckメソッド（境界値 - 1）", () => {
    expect(lengthCheck("000000000", 10)).toBe("");
  });

  test("lengthCheckメソッド（境界値イコール）", () => {
    expect(lengthCheck("0000000000", 10)).toBe("");
  });

  test("lengthCheckメソッドのテスト（境界値 + 1）", () => {
    expect(lengthCheck("00000000000", 10)).toBe("10文字以下で入力してください");
  });

  test("requireCheckメソッドのテスト 値あり", () => {
    expect(requireCheck("testName")).toBe("");
  });

  test("requireCheckメソッドのテスト 値なし", () => {
    expect(requireCheck("")).toBe("必ず入力してください");
  });

  test("checkDataForamtメソッドのテスト YYYY/MM/DD形式の正しい日付", () => {
    expect(checkDateFormat("2022/02/03")).toBe("");
  });

  test("checkDataForamtメソッドのテスト YYYY/MM/DDの形式の文字列", () => {
    expect(checkDateFormat("2022/16/55")).toBe("");
  });

  test("checkDataForamtメソッドのテスト YYYY/MM/DDの形式でない値", () => {
    expect(checkDateFormat("testValue")).toBe(
      "2022/1/11の形式で入力してください"
    );
  });

  test("checkDataValueメソッドのテスト 有効値の日付", () => {
    expect(checkDateValue("2022/02/05")).toBe("");
  });

  test("checkDataValueメソッドのテスト 無効値の日付", () => {
    expect(checkDateValue("2022/50/19")).toBe("有効な日付を入力してください");
  });

  test("checkDataValueメソッドのテスト YYYY/MM/DDの形式ではない", () => {
    expect(checkDateValue("testest")).toBe("有効な日付を入力してください");
  });
});
