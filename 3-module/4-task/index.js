/**
 * showSalary
 * @param {Array} users - данные о пользователях
 * @param {number} age - максимальный возраст
 * @returns {string}
 */
function showSalary(users, age) {
  const filtredUsers = users.filter(item => item.age <= age);
  
  const salaries = filtredUsers.map(item => 
    `${item.name}, ${item.balance}`);

  return salaries.join("\n");
}
