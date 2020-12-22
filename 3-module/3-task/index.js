/**
 * @param {string} str
 * @returns {string}
 */

function camelize(str) {
  return str.split("-").map((item, index) => 
    ucFirstExept(item, index)).join("");
}

function ucFirstExept(str, index) {
  if (!str || index === 0) {
    return str;
  }

  return `${str[0].toUpperCase()}${str.slice(1)}`;
};