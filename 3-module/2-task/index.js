/**
 * @param {number[]} arr
 * @param {number} a
 * @param {number} b
 * @returns {number[]}
 */
function filterRange(arr, a, b) {
  return arr.filter(item => item >= a && item <=b);
}


// Первый вариант:
/*
function filterRange(arr, a, b) {
  let filteredArr = [];

  for (let item of arr) {

    if (item >= a && item <= b) {
      filteredArr.push(item);
    }

  }

  return filteredArr;
}
*/
