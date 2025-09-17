import {LitElement, html} from 'lit';
import {addEmployee} from '../../utils/storageHelper.js';
import {getMessages} from '../../i18n/getLanguages.js';
import '../../components/page-header/index.js';
import {validateForm} from '../../utils/validate-forms.js';
/** {
    "id": "1",
    "firstName": "Jennifer",
    "lastName": "Andrews",
    "doe": "2024-08-09",
    "dob": "1983-12-10",
    "phone": "(869)169-4833x190",
    "email": "jennifer.andrews@hotmail.com",
    "department": "Analytics",
    "position": "Junior"
  }, */

export class AddNewEmployee extends LitElement {

  handleCancel() {
    window.location.href = '/employee-list';
  }

  render() {
    const errors = this.errors || {};
    return html`
      <link rel="stylesheet" href="src/pages/add-new-employee/styles.css" />
      <div class="add-new-employee">
      <page-header title="Add Employee"></page-header>
      <form @submit="${this.handleSubmit}">
      <div class="form-container">
        <label>
          <div class="label-text">${getMessages('008')}</div>
          <input type="text" name="firstName" required />
          ${errors.name ? html`<div class="error">${errors.name}</div>` : ''}
        </label>
        <label>
          <div class="label-text">${getMessages('009')}</div>
          <input type="text" name="lastName" required />
        </label>
        <label>
          <div class="label-text">${getMessages('010')}</div>
          <input type="date" name="doe" required placeholder=${getMessages('032')} />
        </label>
        <label>
          <div class="label-text">${getMessages('011')}</div>
          <input type="date" name="dob" required />
        </label>
        <label>
          <div class="label-text">${getMessages('013')}</div>
          <input type="email" name="email" required />
          ${errors.email ? html`<div class="error">${errors.email}</div>` : ''}
        </label>
        <label>
          <div class="label-text">${getMessages('012')}</div>
          <input type="tel" name="phone" required />
          ${errors.phone ? html`<div class="error">${errors.phone}</div>` : ''}
        </label>
        <label>
          <div class="label-text">${getMessages('014')}</div>
          <select name="department" required>
            <option value="" disabled selected>${getMessages('036')}</option>
            <option value="Analytics">${getMessages('031')}</option>
            <option value="IT">${getMessages('030')}</option>
          </select>
        </label>
        <label>
          <div class="label-text">${getMessages('015')}</div>
          <select name="position" required placeholder=${getMessages('036')}>
            <option value="" disabled selected>${getMessages('036')}</option>
  
          <option value="Junior">${getMessages('033')}</option>
            <option value="Medior">${getMessages('034')}</option>
            <option value="Senior">${getMessages('035')}</option>
          </select>
        </label>
        </div>
        <div class="button-container">
        <button type="submit" disabled=${Object.keys(errors).length > 0} class=" form-button save-button">${getMessages('021')}</button>
          <button type="button" @click="${this.handleCancel}" class=" form-button cancel-button">${getMessages('025')}</button>
        </div>
      </form>
      </div>
    `;
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const employeeData = Object.fromEntries(formData);
    const errors = validateForm(employeeData);
    if (Object.keys(errors).length > 0) {
      this.errors = errors;
      this.requestUpdate();
      console.error('Validation errors:', errors);
      return;
    }
    addEmployee(employeeData);
    console.log('Employee Data Saved:', employeeData);
    window.location.href = '/employee-list';
  }
}

customElements.define('add-new-employee', AddNewEmployee);
