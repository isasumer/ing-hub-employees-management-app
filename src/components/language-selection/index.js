import {LitElement, html} from 'lit';


export class LanguageSelection extends LitElement {
  static properties = {language: {type: String}};

  constructor() {
    super();
    this.language = document.documentElement.lang || 'en';
    this._onLang = (e) => {
      this.language = e.detail;
      this.requestUpdate();
    };
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('app-language', this._onLang);
  }
  disconnectedCallback() {
    window.removeEventListener('app-language', this._onLang);
    super.disconnectedCallback();
  }

  setLanguage(lang) {
    document.documentElement.lang = lang;
    localStorage.setItem('appLanguage', lang);
    window.dispatchEvent(new CustomEvent('app-language', {detail: lang}));
  }
    render() {
        return html` 
              <link rel="stylesheet" href="src/components/language-selection/language-selection.css" />

        <div class="language">
            ${this.language === 'tr'
              ? html`<button
                  class="flag-btn"
                  @click=${() => this.setLanguage('en')}
                  title="Türkçe"
                >
                  <img
                    class="flag"
                    src="src/assets/icons/flag-tr.svg"
                    alt="add new"
                  />
                </button>`
              : html`<button
                  class="flag-btn"
                  @click=${() => this.setLanguage('tr')}
                  title="English"
                >
                  <img
                    class="flag"
                    src="src/assets/icons/flag-eng.svg"
                    alt="add new"
                  />
                </button>`}
          </div>
        `;
    }
}

customElements.define('language-selection', LanguageSelection);