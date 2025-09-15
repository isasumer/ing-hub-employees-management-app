import { html, LitElement } from 'lit';
import '../components/language-selection/index.js';
import { getMessages } from '../i18n/getLanguages.js';

export class AppHeader extends LitElement {

  constructor() {
    super();
  }

  render() {

    return html`
      <link rel="stylesheet" href="src/views/app-header.css" />
      <div class="app-header">
        <div class="left-side">
          <img class="logo" src="src/assets/logo/logo.png" alt="ING" />
          <div class="logo-text">ING</div>
        </div>
        <div class="right-side">
          <a class="link " href="/employee-list">
            <img
              class="person"
              src="src/assets/icons/person.svg"
              alt="Employees"
            />
            <div class="person-text">${getMessages('001')}</div></a
          >
          <a class="link " href="/add-new-employee">
            <img
              class="plus"
              src="src/assets/icons/plus-add-new.svg"
              alt="add new"
            />
            <div class="person-text">${getMessages('002')}</div></a
          >
          <language-selection></language-selection>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this._onLanguageChange = () => this.requestUpdate();
    window.addEventListener('app-language', this._onLanguageChange);
  }

  disconnectedCallback() {
    window.removeEventListener('app-language', this._onLanguageChange);
    super.disconnectedCallback();
  }
}

customElements.define('app-header', AppHeader);
