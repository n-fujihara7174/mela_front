const lengthErrorMessage = "?文字以下で入力してください";
const requireErrorMessage = "必ず入力してください";
const dateFormatErrorMessage = "2022/1/11の形式で入力してください"
const dateValueErrorMessage = "有効な日付を入力してください"

export const lengthCheck = (checkTarget: string, maxNum: number) => {
  if(checkTarget.length > maxNum){
    return lengthErrorMessage.replace("?", maxNum.toString());
  }else{
    return ""
  }
}

export const requireCheck = (checkTarget: string) => {
  if(checkTarget == "" || checkTarget == "0"){
    return requireErrorMessage;
  }else{
    return "";
  }
}

export const checkDateFormat = (strDate: string) => {
  if(!strDate.match(/^\d{4}\/\d{2}\/\d{2}$/)){
    return dateFormatErrorMessage;
  }else{
    return "";
  }
}

export const checkDateValue = (strDate: string) => {
  let date = new Date(strDate)
  if(!isNaN(date.getDate())){
    return dateValueErrorMessage;
  }else{
    return "";
  }
}