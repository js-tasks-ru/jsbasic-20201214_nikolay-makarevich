/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
    const statusCell = getIndexOfColumn("Status", table);
    const genderCell = getIndexOfColumn("Gender", table);
    const ageCell = getIndexOfColumn("Age", table);
    
    const rows = table.tBodies[0].querySelectorAll("tr");
    
    rows.forEach(element => {
        setAvailableIfCan(element, statusCell);
        setGenderIfCan(element, genderCell);
        setTextDecoration(element, ageCell);
    })
 }

//Функция для получения индекса колонки, соответствующего "Age"/"Gender"/"Status"
function getIndexOfColumn(columnName, table) {
    const cells = table.tHead.querySelectorAll('td');
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].textContent === columnName) {
            return i;
        }
    }
}

function setAvailableIfCan(element, statusCell) {
    if (element.cells[statusCell].dataset.available == "false") {
        element.classList.add("unavailable");
    }
    else if (!element.cells[statusCell].dataset.available) {
        element.setAttribute("hidden", "hidden");
    }
    else {
        element.classList.add("available");
    }
}

function setGenderIfCan(element, genderCell) {
    if (element.cells[genderCell].textContent == "m") {
        element.classList.add("male");
    }
    else {
        element.classList.add("female");
    }
}

function setTextDecoration(element, ageCell) {
    if (element.cells[ageCell].textContent < 18) {
        element.style.textDecoration = "line-through";
    }
}