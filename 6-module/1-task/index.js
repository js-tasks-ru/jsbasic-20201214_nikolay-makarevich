/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
  constructor(rows) {
    this._rows = rows;
    this.elem = document.createElement('table');
    this.renderTable();
  }

  renderTable() {
    this.elem.innerHTML = `${tableHeaderTemplate()}
          ${tableBodyTemplate(this._rows)}`;

    this.elem.addEventListener('click', (event) => {
      const target = event.target;

      if (target.tagName !== 'BUTTON') {
        return;
      }

      const tr = target.closest('tr');
      tr.remove();
    })
  }
}   
  
function tableHeaderTemplate() {
  return `<thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    </thead>`
}  

function tableBodyTemplate(items = []) {
  return `<tbody>
      ${items.map(item => `<tr>${tableCellsTemplate(item)}${deleteTableRowButton()}</tr>`).join('')}
    </tbody>`;
}

function tableCellsTemplate(item = {}) {
  let cells = '';
  for (const key in item) {
    cells += `<td>${item[key]}</td>`
  }
  return cells;
}

function deleteTableRowButton() {
  return `<td><button>X</button></td>`
}