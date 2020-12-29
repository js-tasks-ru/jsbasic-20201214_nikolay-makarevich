/**
 * Генерация HTML списка друзей
 * @param {Object[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList(friends) {
  const uList = document.createElement("ul");
  
  friends.map(({ firstName, lastName }) => {
    uList.insertAdjacentHTML('afterbegin', friendTemplate({firstName, lastName}));
  })

  return uList;
}

function friendTemplate({ firstName, lastName } = {}) {
  return `<li>${firstName} ${lastName}</li>`;
}