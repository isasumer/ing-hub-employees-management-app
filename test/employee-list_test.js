import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('employee-list', () => {
  setup(() => {
    localStorage.setItem('appLanguage', 'en');
    localStorage.setItem('employees', JSON.stringify([
      {id: '1', firstName: 'A', lastName: 'B', doe: '2020-01-01', dob: '2000-01-01', phone: '+90 555 444 33 22', email: 'a@b.com', department: 'IT', position: 'Junior'},
      {id: '2', firstName: 'C', lastName: 'D', doe: '2021-01-01', dob: '2001-01-01', phone: '+90 555 444 33 22', email: 'c@d.com', department: 'IT', position: 'Senior'},
    ]));
  });

  test('defaults to table view and toggles to grid view', async () => {
    await import('../src/i18n/getLanguages.js');
    window.dispatchEvent(new CustomEvent('app-language', {detail: 'en'}));
    await import('../src/pages/employee-list/index.js');
    await import('../src/components/page-header/index.js');
    const el = await fixture(html`<employee-list></employee-list>`);
    await el.updateComplete;
    // default is table view
    assert.instanceOf(
      el.shadowRoot.querySelector('table-view'),
      HTMLElement,
      'renders table-view by default'
    );
    // switch to grid
    el.shadowRoot.querySelectorAll('.view-btn')[1].click();
    await el.updateComplete;
    assert.instanceOf(
      el.shadowRoot.querySelector('grid-view'),
      HTMLElement,
      'renders grid-view after click'
    );
  });
});


