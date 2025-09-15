import {LitElement, html} from 'lit';

export class EmployeeList extends LitElement {
  render() {
    return html` <h1>Employee List</h1> `;
  }
}

customElements.define('employee-list', EmployeeList);
