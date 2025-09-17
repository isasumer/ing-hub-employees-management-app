import {fixture, assert, oneEvent} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import '../src/pages/add-new-employee/index.js';

suite('add-new-employee', () => {
  setup(() => {
    localStorage.clear();
  });

  test('shows validation errors on invalid submit', async () => {
    const el = await fixture(html`<add-new-employee></add-new-employee>`);
    await el.updateComplete;
    const form = el.shadowRoot.querySelector('form');
    form.querySelector('input[name="email"]').value = 'bad';
    form.querySelector('input[name="phone"]').value = '123';
    form.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));
    await el.updateComplete;
    const errorNodes = el.shadowRoot.querySelectorAll('.error');
    assert.isAtLeast(errorNodes.length, 1);
  });
});


