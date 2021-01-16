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
    this._container = null;
    this._renderTable();
  }

  _renderTable() {
    this._container = document.createElement('table');
    this._container.innerHTML = tableTemplate(tableHeaderNames, this._rows);

    this._container.addEventListener('click', this._onDeleteButtonClick)
  }

  _onDeleteButtonClick(event) {
    const target = event.target;

      if (target.tagName !== 'BUTTON') {
        return;
      }

      target.closest('tr').remove();
  }

  get elem() {
    return this._container;
  }
}   

const tableHeaderNames = ['Имя', 'Возраст', 'Зарплата', 'Город'];
  

function tableTemplate(headerNames, items) {
  return `<thead>
  <tr>
    ${headerNames.map(item => `<th>${item}</th>`).join('')}
    <th></th>
  </tr>
</thead>
  <tbody>
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