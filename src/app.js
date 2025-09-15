import {routes, createRouter} from './routes';
import {LitElement, html} from 'lit';
import './views';

export class App extends LitElement {
  constructor() {
    super();
    this._onLanguageChange = () => {
        console.log('Language change detected, updating UI');
        this.requestUpdate();
    };
    window.addEventListener('app-language', this._onLanguageChange);
  }

  disconnectedCallback() {
    window.removeEventListener('app-language', this._onLanguageChange);
    super.disconnectedCallback();
  }

  firstUpdated() {
    this.router = createRouter(this.renderRoot?.querySelector('#outlet'));
    this.router.setRoutes(routes);

  }

  render() {
    return html`
      <div class="app-root">
        <app-header></app-header>
        <div id="outlet"></div>
      </div>
    `;
  }
}

customElements.define('app-root', App);