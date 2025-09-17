import {LitElement, html} from 'lit';
import {getEmployees} from '../../utils/storageHelper';
import './grid-view';
import './table-view';
import { addLanguageChangeListener, removeLanguageChangeListener } from '../../utils/languageHelper.js';
import { getMessages } from '../../i18n/getLanguages.js';

export class EmployeeList extends LitElement {
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
  setView(view) {
    this.view = view;
    this.requestUpdate();
  }

  updatePagination(currentPage, pageSize) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.requestUpdate();
  }

  render() {
    return html`
      <link rel="stylesheet" href="src/pages/employee-list/employee-list.css" />
      <div class="employee-list">
        <div class="employee-list-header">
          <page-header title="${getMessages('019')}"></page-header>
          <div class="view-buttons">
            <button
              class="view-btn"
              @click=${() => this.setView('table')}
              title="Table"
            >
              <img
                class="view"
                src="src/assets/icons/list-view.svg"
                alt="table"
              />
            </button>
            <button
              class="view-btn"
              @click=${() => this.setView('grid')}
              title="Grid"
            >
              <img
                class="view"
                src="src/assets/icons/grid-view.svg"
                alt="grid"
              />
            </button>
          </div>
        </div>
        <div class="list-container">
          ${this.view === 'grid'
            ? html`<grid-view .currentPage=${this.currentPage} .pageSize=${this.pageSize}></grid-view>`
            : html`<table-view .currentPage=${this.currentPage} .pageSize=${this.pageSize}></table-view>`}
        </div>
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

customElements.define('employee-list', EmployeeList);
