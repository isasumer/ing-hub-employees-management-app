import {LitElement, html} from 'lit';

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
    this.employees = [];

    this.currentPage = 1;
    this.pageSize = 10;
    this.searchQuery = '';
    this.selectedEmployeeId = null;


    window.addEventListener('language-changed', () => {
      this.requestUpdate();
    });
  }
  async firstUpdated() {
    this.requestUpdate();
  }

  render() {

    console.log(this.employees);
    return html`
      <h1>Employee List</h1>
      <div>
        <button @click=${() => this.view = 'grid'}>Grid</button>
        <button @click=${() => this.view = 'table'}>Table</button>
      </div>
    `;
  }
}

customElements.define('employee-list', EmployeeList);
