import {LitElement, html} from 'lit';
import {
  getEmployees,
  deleteEmployee as removeEmployee,
} from '../../utils/storageHelper';
import {getMessages} from '../../i18n/getLanguages';
import {
  addLanguageChangeListener,
  removeLanguageChangeListener,
} from '../../utils/languageHelper.js';

export class GridView extends LitElement {
  static properties = {
    employees: {type: Array},
    view: {type: String}, // grid |table
    currentPage: {type: Number},
    pageSize: {type: Number},
    selectedEmployeeId: {type: Number},
    searchQuery: {type: String},
    showConfirm: {type: Boolean},
    pendingDeleteId: {type: Number},
  };

  constructor() {
    super();
    this.employees = getEmployees();

    this.currentPage = 1;
    this.pageSize = 10;
    this.searchQuery = '';
    this.selectedEmployeeId = null;
    this.showConfirm = false;
    this.pendingDeleteId = null;

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
      } else if (i === this.currentPage - 3 || i === this.currentPage + 3) {
        pageNumbers.push('...');
      }
    }

    return html`
    <div class="pagination-controls">
      <button
        class="pagination-btn left-arrowbtn"
        @click="${this.previousPage}"
        ?disabled=${this.currentPage === 1}
      >
        ${this.currentPage > 1
          ? html`<img
              class="arrow"
              src="src/assets/icons/arrow-primary.svg"
              alt="arrow"
            />`
          : html`<img
              class="arrow"
              src="src/assets/icons/arrow.svg"
              alt="arrow"
            />`}
      </button>
      <div class="pagination-numbers">
        ${pageNumbers.map(
          (page) =>
            html`<button
              @click="${() => this.goToPage(page)}"
              class="pagination-btn ${page === this.currentPage
                ? 'pagination-active'
                : ''}"
              ?disabled=${page === '...'}
            >
              ${page}
            </button>`
        )}
      </div>
      <button
        class="pagination-btn right-arrowbtn"
        @click="${this.nextPage}"
        ?disabled=${this.currentPage === totalPages}
      >
        ${this.currentPage < totalPages
          ? html`<img
              class="arrow"
              src="src/assets/icons/arrow-primary.svg"
              alt="arrow"
              style="transform: rotate(180deg);"
            />`
          : html`<img
              class="arrow"
              src="src/assets/icons/arrow.svg"
              alt="arrow"
              style="transform: rotate(180deg);"
            />`}
      </button>
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
      <div class="grid-view" style="grid-template-columns:1fr 1fr;">
        ${this.getPaginatedEmployees()?.map((employee) =>
          this.renderEmployeeCard(employee)
        )}
      </div>
      ${this.renderPagination()}
      ${this.showConfirm ? this.renderDeleteConfirmation() : ''}
    `;
  }


  renderDeleteConfirmation() {
    return html`<div class="modal-backdrop" @click=${this.onBackdropClick}>
      <div class="modal" @click=${(e) => e.stopPropagation()}>
        <div class="modal-header">${getMessages('023')}</div>
        <div class="modal-body">${this.confirmTextTemplate()}</div>
        <div class="modal-action-buttons">
          <button class="modal-btn confirm-delete" @click=${this.confirmDelete}>
            ${getMessages('038')}
          </button>
          <button class="modal-btn cancel-delete" @click=${this.cancelDelete}>
            ${getMessages('025')}
          </button>
        </div>
      </div>
    </div>`;
  }
  renderEmployeeCard(employee) {
    function editEmployee(employeeId) {
      window.location.href = `/edit-employee?id=${employeeId}`;
    }
    return html`
      <div class="employee-card">
        ${Object.entries(employee)
          .filter(([key]) => key !== 'id')
          .map(([key, value]) => this.renderEmployeeCardItem(key, value))}
        <div class="employee-card-actions">
          <button
            class="employee-card-edit-btn"
            @click=${() => editEmployee(employee.id)}
          >
            <img
              class="employee-card-edit-btn-icon"
              src="src/assets/icons/edit-white.svg"
              alt="edit"
            />
            ${getMessages('018')}
          </button>
          <button
            class="employee-card-delete-btn"
            @click=${() => this.deleteEmployee(employee.id)}
          >
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

  deleteEmployee(employeeId) {
    this.pendingDeleteId = employeeId;
    this.showConfirm = true;
  }

  cancelDelete = () => {
    this.showConfirm = false;
    this.pendingDeleteId = null;
  };

  onBackdropClick = () => {
    this.cancelDelete();
  };

  confirmTextTemplate() {
    const employee = this.employees.find((e) => e.id === this.pendingDeleteId);
    if (!employee) return '';
    return html`<div>
      ${getMessages('039').replace('#', employee.firstName + ' ' + employee.lastName)}
    </div>`;
  }

  confirmDelete = () => {
    if (this.pendingDeleteId == null) return;
    removeEmployee(this.pendingDeleteId);
    this.employees = getEmployees();
    this.showConfirm = false;
    this.pendingDeleteId = null;
  };

  disconnectedCallback() {
    removeLanguageChangeListener(this._onLanguageChange);
    super.disconnectedCallback();
  }
}

customElements.define('grid-view', GridView);
