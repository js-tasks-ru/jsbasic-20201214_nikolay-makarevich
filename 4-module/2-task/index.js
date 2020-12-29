/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
    const rows = table.querySelectorAll("tr");

    rows.forEach((item, i) => item.children[i].style.backgroundColor = "red");
}
