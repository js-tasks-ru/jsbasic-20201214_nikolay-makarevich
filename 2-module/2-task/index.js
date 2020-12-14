/**
 * Проверяем объект obj на пустоту
 * @param {Object} obj
 * @returns {Boolean}
 */
function isEmpty(obj) {
  let count = 0;

  for (let key in obj) {
    count++;  
  }

  if (count) {
    return false;
  }

  return true;
}
