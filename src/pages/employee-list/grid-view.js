import {LitElement, html} from 'lit';
import {getEmployees} from '../../utils/storageHelper';
import {getMessages} from '../../i18n/getLanguages';
import { addLanguageChangeListener, removeLanguageChangeListener } from '../../utils/languageHelper.js';

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

  nextPage() {
    if (this.currentPage * this.pageSize < this.employees.length) {
      this.currentPage += 1;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
  }

  getPaginatedEmployees() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = this.currentPage * this.pageSize;
    return this.employees.slice(start, end);
  }

  renderPagination() {
    const totalPages = Math.ceil(this.employees.length / this.pageSize);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= this.currentPage - 2 && i <= this.currentPage + 2)
      ) {
        pageNumbers.push(i);
      } else if (
        i === this.currentPage - 3 ||
        i === this.currentPage + 3
      ) {
        pageNumbers.push('...');
      }
    }

    return html`
      <div class="pagination-controls">
        <button @click="${this.previousPage}" ?disabled=${this.currentPage === 1}>&lt;</button>
        ${pageNumbers.map(
          (page) =>
            html`<button
              @click="${() => this.goToPage(page)}"
              class="${page === this.currentPage ? 'active' : ''}"
              ?disabled=${page === '...'}
            >
              ${page}
            </button>`
        )}
        <button @click="${this.nextPage}" ?disabled=${this.currentPage === totalPages}>&gt;</button>
      </div>
    `;
  }

  goToPage(page) {
    if (page !== '...') {
      this.currentPage = page;
    }
  }

  render() {
    return html`
      <link rel="stylesheet" href="src/pages/employee-list/employee-list.css" />
      <div
        class="grid-view"
        style="grid-template-columns:1fr 1fr;"
      >
        ${this.getPaginatedEmployees()?.map((employee) => this.renderEmployeeCard(employee))}
      </div>
      ${this.renderPagination()}
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
    return html`
      <div class="employee-card-item">
        <div class="employee-card-item-label">${detailsMap[key]}</div>
        <div class="employee-card-item-value">${value}</div>
      </div>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    this._onLanguageChange = () => this.requestUpdate();
    addLanguageChangeListener(this._onLanguageChange);
  }

  disconnectedCallback() {
    removeLanguageChangeListener(this._onLanguageChange);
    super.disconnectedCallback();
  }
}



customElements.define('grid-view', GridView);
