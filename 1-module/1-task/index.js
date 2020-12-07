/**
 * Factorial
 * @param {number} n
 * @returns {number}
 */
function factorial(n) {
  if (!n) {
    return 1;
  }

  let result = 1;

  while (n > 0) {
    result *= n;
    n--;
  }
  
  return result;
}
