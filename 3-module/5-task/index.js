/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  let strArr = str.split(',').join(' ').split(' ');

  let numArr = strArr.map(item => {
    if(!isFinite(item)) {
      return 0;
    }
    return +item;
  });

  return {min: Math.min(...numArr), max: Math.max(...numArr)};
}

//Классический вариант
/*
function getMinMax(str) {
  let strArr = str.split(',').join(' ').split(' ');

  let min = 0;
  let max = 0;

  for (let i = 0; i < strArr.length; i++) {
    if (+strArr[i] > max) {
      max = +strArr[i];
    }
    if (+strArr[i] < min) {
      min = +strArr[i];
    }
  }
 
  return {min, max};
}
*/
