import {LitElement, html} from 'lit';

export class AddNewEmployee extends LitElement {
    render() {
        return html` <h1>Add New Employee</h1> `;
    }
}

customElements.define('add-new-employee', AddNewEmployee);