/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
    const statusColumnIndex = getIndexOfColumn("Status", table);
    const genderColumnIndex = getIndexOfColumn("Gender", table);
    const ageColumnIndex = getIndexOfColumn("Age", table);
    
    const rows = table.tBodies[0].children;
    
    for (let i = 0; i < rows.length; i++) {
        //Проверка атрибутов Status
        if (rows[i].cells[statusColumnIndex].dataset.available == "false") {
            rows[i].classList.add("unavailable");
        }
        else if (!rows[i].cells[statusColumnIndex].dataset.available) {
            rows[i].setAttribute("hidden", "hidden");
        }
        else {
            rows[i].classList.add("available");
        }
        
        //Установка класса для Gender
        if (rows[i].cells[genderColumnIndex].textContent == "m") {
            rows[i].classList.add("male");
        }
        else {
            rows[i].classList.add("female");
        }

        //Проверка возраста
        if (rows[i].cells[ageColumnIndex].textContent < 18) {
            rows[i].style.textDecoration = "line-through";
        }
    }
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


