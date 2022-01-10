const lengthErrorMessage = "?文字以下で入力してください";
const requireErrorMessage = "必ず入力してください";

export const lengthCheck = (CheckTarget: string, MaxNum: number) => {
  if(CheckTarget.length > MaxNum){
    console.log("validationCheck内 : " + lengthErrorMessage.replace("?", MaxNum.toString()))
    return lengthErrorMessage.replace("?", MaxNum.toString());
  }else{
    return ""
  }
}

export const requireCheck = (CheckTarget: string) => {
  if(CheckTarget == "" || CheckTarget == "0"){
    return requireErrorMessage;
  }else{
    return "";
  }
}
