import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import '../src/components/page-header/index.js';

suite('page-header', () => {
  test('renders title', async () => {
    const el = await fixture(html`<page-header title="Hello"></page-header>`);
    const text = el.shadowRoot.querySelector('.title').textContent.trim();
    assert.equal(text, 'Hello');
  });
});


