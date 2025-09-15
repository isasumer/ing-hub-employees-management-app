import {LitElement, html} from 'lit';

export class EditEmployee extends LitElement {
    render() {
    return html` <h1>Edit Employee</h1> `;
  }
}

customElements.define('edit-employee', EditEmployee);
