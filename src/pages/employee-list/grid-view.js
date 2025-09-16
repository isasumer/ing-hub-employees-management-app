import {LitElement, html} from 'lit';
import {getEmployees} from '../../utils/storageHelper';
import {getMessages} from '../../i18n/getLanguages';

export class GridView extends LitElement {
  static properties = {
    employees: {type: Array},
    view: {type: String}, // grid |table
    currentPage: {type: Number},
    pageSize: {type: Number},
    selectedEmployeeId: {type: Number},
    searchQuery: {type: String},
  };

  constructor() {
    super();
    this.employees = getEmployees();

    this.currentPage = 1;
    this.pageSize = 10;
    this.searchQuery = '';
    this.selectedEmployeeId = null;

    window.addEventListener('language-changed', () => {
      this.requestUpdate();
    });
  }
  render() {
    return html`
      <link rel="stylesheet" href="src/pages/employee-list/employee-list.css" />
      <div
        class="grid-view"
        style="grid-template-columns:1fr 1fr;"
      >
        ${this.employees?.map((employee) => this.renderEmployeeCard(employee))}
      </div>
    `;
  }

  renderEmployeeCard(employee) {
    return html`
      <div class="employee-card">
        ${Object.entries(employee)
          .filter(([key]) => key !== 'id')
          .map(([key, value]) => this.renderEmployeeCardItem(key, value))}
        <div class="employee-card-actions">
          <button class="employee-card-edit-btn" @click=${() => this.editEmployee(employee.id)}>
            <img
              class="employee-card-edit-btn-icon"
              src="src/assets/icons/edit-white.svg"
              alt="edit"
            />
            ${getMessages('018')}
          </button>
          <button class="employee-card-delete-btn" @click=${() => this.deleteEmployee(employee.id)}>
            <img
              class="employee-card-delete-btn-icon"
              src="src/assets/icons/trash-white.svg"
              alt="delete"
            />
            ${getMessages('020')}
          </button>
        </div>
      </div>
    `;
  }

  renderEmployeeCardItem(key, value) {
    return html`
      <div class="employee-card-item">
        <div class="employee-card-item-label">${detailsMap[key]}</div>
        <div class="employee-card-item-value">${value}</div>
      </div>
    `;
  }
}

const detailsMap = {
  firstName: getMessages('008'),
  lastName: getMessages('009'),
  doe: getMessages('010'),
  dob: getMessages('011'),
  phone: getMessages('012'),
  email: getMessages('013'),
  department: getMessages('014'),
  position: getMessages('015'),
};

customElements.define('grid-view', GridView);
