import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import '../src/pages/home.js';

suite('home-view', () => {
  test('renders heading', async () => {
    const el = await fixture(html`<home-view></home-view>`);
    assert.equal(el.shadowRoot.textContent.trim(), 'Home');
  });
});


