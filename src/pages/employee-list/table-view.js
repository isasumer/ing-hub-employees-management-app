import {LitElement, html} from 'lit';
import {
  getEmployees,
  deleteEmployee as removeEmployee,
} from '../../utils/storageHelper';
import {
  addLanguageChangeListener,
  removeLanguageChangeListener,
} from '../../utils/languageHelper.js';
import {getMessages} from '../../i18n/getLanguages.js';

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
    showDeleteConfirmation: {type: Boolean},
    selectedEmployeeToDelete: {type: Number},
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
    this.showDeleteConfirmation = false;
    this.selectedEmployeeToDelete = null;
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

  editEmployee(employeeId) {
    window.location.href = `/edit-employee?id=${employeeId}`;
  }

  deleteEmployee(employeeId) {
    this.selectedEmployeeToDelete = employeeId;
    this.showDeleteConfirmation = true;
  }

  confirmDelete() {
    if (!this.selectedEmployeeToDelete) return;
    removeEmployee(this.selectedEmployeeToDelete);
    this.employees = getEmployees();
    this.showDeleteConfirmation = false;
    this.selectedEmployeeToDelete = null;
  }

  cancelDelete() {
    this.showDeleteConfirmation = false;
    this.selectedEmployeeToDelete = null;
  }

  render() {
    return html`<div>
      <link rel="stylesheet" href="src/pages/employee-list/employee-list.css" />
      <div class="table-container">
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
            ${this.getPaginatedEmployees()?.map(
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
                  .filter(([key]) => key !== 'id')
                  .map(
                    ([key, value]) => html` <td class=${key}>${value}</td> `
                  )}
                <td>
                  <div class="action-buttons">
                    <button
                      class="action-btn"
                      // @click=${() => this.editEmployee(employee.id)}
                      title="Table"
                    >
                      <img
                        class="edit-icon"
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
                        class="delete-icon"
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
        ${this.renderPagination()}
      </div>
      ${this.showDeleteConfirmation ? this.renderDeleteConfirmation() : ''}
    </div>`;
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

  connectedCallback() {
    super.connectedCallback();
    this._onLanguageChange = () => this.requestUpdate();
    addLanguageChangeListener(this._onLanguageChange);
  }

  disconnectedCallback() {
    removeLanguageChangeListener(this._onLanguageChange);
    super.disconnectedCallback();
  }

  confirmTextTemplate() {
    const employee = this.employees.find(
      (e) => e.id === this.selectedEmployeeToDelete
    );
    if (!employee) return html``;
    return html`<div>
      ${getMessages('039').replace(
        '#',
        employee.firstName + ' ' + employee.lastName
      )}
    </div>`;
  }

  onBackdropClick() {
    this.cancelDelete();
  }
}

customElements.define('table-view', TableView);
