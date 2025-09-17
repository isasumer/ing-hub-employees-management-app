import {fixture, assert} from '@open-wc/testing';
import {html} from 'lit/static-html.js';
import '../src/components/language-selection/index.js';

suite('language-selection', () => {
  setup(() => {
    localStorage.clear();
    document.documentElement.lang = 'en';
  });

  test('initial language from document', async () => {
    document.documentElement.lang = 'tr';
    const el = await fixture(html`<language-selection></language-selection>`);
    assert.equal(el.language, 'tr');
  });

  test('setLanguage updates document, storage and dispatches event', async () => {
    const el = await fixture(html`<language-selection></language-selection>`);
    let received;
    const handler = (e) => (received = e.detail);
    window.addEventListener('app-language', handler, {once: true});
    el.setLanguage('tr');
    assert.equal(document.documentElement.lang, 'tr');
    assert.equal(localStorage.getItem('appLanguage'), 'tr');
    await el.updateComplete;
    assert.equal(el.language, 'tr');
    assert.equal(received, 'tr');
  });
});


