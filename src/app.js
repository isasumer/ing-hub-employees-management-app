import {routes, createRouter} from './routes';
import {LitElement, html} from 'lit';
import './views';

export class App extends LitElement {
  constructor() {
    super();
  }

  firstUpdated() {
    this.router = createRouter(this.renderRoot?.querySelector('#outlet'));
    this.router.setRoutes(routes);
  }

  render() {
    return html`
      <link rel="stylesheet" href="src/styles.css" />
      <div class="app-root">
        <app-header></app-header>
        <div id="outlet" class="app-content"></div>
      </div>
    `;
  }
}

customElements.define('app-root', App);
