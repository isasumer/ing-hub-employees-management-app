import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';

suite('grid-view', () => {
  setup(() => {
    localStorage.setItem('appLanguage', 'en');
    const items = Array.from({length: 15}).map((_, i) => ({
      id: String(i + 1),
      firstName: 'F' + i,
      lastName: 'L' + i,
      doe: '2020-01-01',
      dob: '2000-01-01',
      phone: '+90 555 444 33 22',
      email: `e${i}@x.com`,
      department: 'IT',
      position: 'Junior',
    }));
    localStorage.setItem('employees', JSON.stringify(items));
  });

  test('paginates with next/previous and page numbers', async () => {
    await import('../src/i18n/getLanguages.js');
    window.dispatchEvent(new CustomEvent('app-language', {detail: 'en'}));
    await import('../src/pages/employee-list/grid-view.js');
    const el = await fixture(html`<grid-view .pageSize=${10}></grid-view>`);
    await el.updateComplete;
    // first page shows 10 cards
    assert.equal(el.shadowRoot.querySelectorAll('.employee-card').length, 10);
    // go next
    el.shadowRoot.querySelector('.right-arrowbtn').click();
    await el.updateComplete;
    assert.equal(el.currentPage, 2);
    assert.equal(el.shadowRoot.querySelectorAll('.employee-card').length, 5);
    // go previous
    el.shadowRoot.querySelector('.left-arrowbtn').click();
    await el.updateComplete;
    assert.equal(el.currentPage, 1);
  });
});


