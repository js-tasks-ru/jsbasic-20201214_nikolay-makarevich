/**
 * @param {HTMLTableElement} table
 * @return {void}
 */
function makeDiagonalRed(table) {
    const rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
        rows[i].children[i].style.backgroundColor = "red";
    }
}
