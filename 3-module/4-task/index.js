/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  let salaries = [];

  for (let user of users) {
    if (user.age <= age) {
      salaries.push(`${user.name}, ${user.balance}`);
    }
  }

  return salaries.join("\n");
}
