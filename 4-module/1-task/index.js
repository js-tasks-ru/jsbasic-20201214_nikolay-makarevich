/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  const uList = document.createElement("ul");
  
  friends.map(({ firstName, lastName }) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${firstName} ${lastName}`;
    uList.appendChild(listItem);
  })

  return uList;
}
