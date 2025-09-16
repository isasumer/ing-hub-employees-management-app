import {LitElement, html} from 'lit';
import {getEmployees} from '../../utils/storageHelper';
import './grid-view';
import './table-view';

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

  render() {
    return html`
      <link rel="stylesheet" href="src/pages/employee-list/employee-list.css" />
      <div class="employee-list">
        <div class="employee-list-header">
          <h1 class="title">Employee List</h1>
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
            ? html`<grid-view></grid-view>`
            : html`<table-view></table-view>`}
        </div>
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
