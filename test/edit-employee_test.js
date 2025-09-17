import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import '../src/pages/edit-employee/index.js';

suite('edit-employee', () => {
  setup(() => {
    // Seed one employee and set URL param
    localStorage.setItem('employees', JSON.stringify([
      {id: '99', firstName: 'Jane', lastName: 'Doe', doe: '2020-01-01', dob: '2000-01-01', phone: '+90 555 444 33 22', email: 'jane@doe.com', department: 'IT', position: 'Junior'},
    ]));
    const url = new URL(window.location.href);
    url.searchParams.set('id', '99');
    window.history.replaceState({}, '', url);
  });

  test('renders header and employee name text', async () => {
    await import('../src/i18n/getLanguages.js');
    window.dispatchEvent(new CustomEvent('app-language', {detail: 'en'}));
    const el = await fixture(html`<edit-employee></edit-employee>`);
    await el.updateComplete;
    const text = el.shadowRoot.querySelector('.edit-employee-text').textContent;
    assert.include(text, 'Jane Doe');
  });
});


