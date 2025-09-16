import {LitElement, html} from 'lit';
import {getEmployees} from '../../utils/storageHelper';
    
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
    return html`<div>Grid View</div>`;
  }
}

customElements.define('grid-view', GridView);