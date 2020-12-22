/**
 * Найти min/max в произвольной строке
 * @param   {string} str -  входные данные
 * @returns {{min:number, max:number}}  объект
 */
function getMinMax(str) {
  const strArr = str.split(',').join(' ').split(' ');

  const numArr = strArr.filter(item => isFinite(item));

  return {min: Math.min(...numArr), max: Math.max(...numArr)};
}