import {LitElement, html} from 'lit';
import {getEmployees} from '../../utils/storageHelper';
import {getMessages} from '../../i18n/getLanguages';

export class TableView extends LitElement {
  static properties = {
    employees: {type: Array},
    view: {type: String}, // grid |table
    currentPage: {type: Number},
    pageSize: {type: Number},
    selectedEmployeeId: {type: Number},
    selectedEmployees: {type: Array},
    selectedAll: {type: Boolean},
    searchQuery: {type: String},
  };

  constructor() {
    super();
    this.employees = getEmployees();
    this.selectedEmployees = [];
    this.currentPage = 1;
    this.pageSize = 10;
    this.searchQuery = '';
    this.selectedEmployeeId = null;
    this.selectedAll = false;
    window.addEventListener('language-changed', () => {
      this.requestUpdate();
    });
  }
  toggleSelectAll(event) {
    event.stopPropagation();
    const isChecked = event.target.checked;
    this.selectedAll = isChecked;
    if (isChecked) {
      this.selectedEmployees = this.employees.map((employee) => employee.id);
    } else {
      this.selectedEmployees = [];
    }
  }

  toggleSelect(event, employeeId) {
    event.stopPropagation();

    this.selectedEmployees = this.selectedEmployees.includes(employeeId)
      ? this.selectedEmployees.filter((id) => id !== employeeId)
      : [...this.selectedEmployees, employeeId];
  }
  render() {
    return html`<div>
      <link rel="stylesheet" href="src/pages/employee-list/employee-list.css" />

      <table class="table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                class="checkbox"
                @change="${this.toggleSelectAll}"
              />
            </th>
            <th>${getMessages('008')}</th>
            <th>${getMessages('009')}</th>
            <th>${getMessages('010')}</th>
            <th>${getMessages('011')}</th>
            <th>${getMessages('012')}</th>
            <th>${getMessages('013')}</th>
            <th>${getMessages('014')}</th>
            <th>${getMessages('015')}</th>
            <th>${getMessages('016')}</th>
          </tr>
        </thead>
        <tbody>
          ${this.employees?.map(
            (employee) => html`
              <tr>
                <td class="checkbox-row">
                  <input
                    type="checkbox"
                    class="checkbox"
                    .checked=${this.selectedEmployees.includes(employee.id)}
                    @click="${(event) => this.toggleSelect(event, employee.id)}"
                  />
                </td>
                ${Object.entries(employee)
                  .filter(([key, value]) => key !== 'id')
                  .map(
                    ([key, value]) => html` <td class=${key}>${value}</td> `
                  )}
                <td>
                  <div class="action-buttons">
                    <button
                      class="action-btn"
                      @click=${() => this.editEmployee(employee.id)}
                      title="Table"
                    >
                      <img
                        class="view"
                        src="src/assets/icons/edit.svg"
                        alt="table"
                      />
                    </button>
                    <button
                      class="action-btn"
                      @click=${() => this.deleteEmployee(employee.id)}
                      title="Grid"
                    >
                      <img
                        class="view"
                        src="src/assets/icons/trash.svg"
                        alt="grid"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            `
          )}
        </tbody>
      </table>
    </div>`;
  }
}

customElements.define('table-view', TableView);

/** {
    "id": "1",
    "firstName": "Jennifer",
    "lastName": "Andrews",
    "doe": "2024-08-09",
    "dob": "1983-12-10",
    "phone": "(869)169-4833x190",
    "email": "jennifer.andrews@hotmail.com",
    "department": "Analytics",
    "position": "Junior"
  }, */
