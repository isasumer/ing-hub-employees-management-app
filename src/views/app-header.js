import {LitElement, html} from 'lit';

export class AppHeader extends LitElement {
  render() {
    return html`<header>Header</header>`;
  }
}

customElements.define('app-header', AppHeader);