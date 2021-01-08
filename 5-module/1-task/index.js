function hideSelf() {
  const hideSelfButton = document.querySelector('.hide-self-button');

  hideSelfButton.onclick = function() {
    hideSelfButton.setAttribute("hidden", "hidden");
  }
}
