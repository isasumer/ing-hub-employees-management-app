
import {LitElement, html} from 'lit';
export class Home extends LitElement {
  render() {
    return html` <h1>Home</h1> `;
  }
}

customElements.define('home-view', Home);
