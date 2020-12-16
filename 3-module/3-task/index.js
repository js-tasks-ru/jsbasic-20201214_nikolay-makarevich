/**
 * @param {string} str
 * @returns {string}
 */
function camelize(str) {
  let arrStr = str.split("-");

  for (let i = 1; i < arrStr.length; i++) {
    arrStr[i] = arrStr[i][0].toUpperCase() + arrStr[i].slice(1);
  }

  return arrStr.join("");
}

//Вариант с использованием map:
/*
function camelize(str) {
  let arrStr = str.split("-");

  let arrStrCamel = ( arrStr.map(item => 
    (item[0].toUpperCase() + item.slice(1))) ).join("");
  
  return arrStrCamel[0].toLowerCase() + arrStrCamel.slice(1);
}
*/

//Вариант с использованием функции ucFirst и map:
/*
function camelize(str) {
  let arrStr = str.split("-");

  let ucFirst = function (str) {
    if (!str) {
      return str;
    }

    return str[0].toUpperCase() + str.slice(1);
  };

  let arrStrCamel = ( arrStr.map(item => ucFirst(item))).join("");

  return arrStrCamel[0].toLowerCase() + arrStrCamel.slice(1);
}
*/