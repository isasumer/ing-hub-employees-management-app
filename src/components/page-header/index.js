import {LitElement, html} from 'lit';

export class PageHeader extends LitElement {
    static properties = {
        title: {type: String},
    }

    constructor() {
        super();
        this.title = '';
    }

    render() {
        return html`
            <link rel="stylesheet" href="src/components/page-header/page-header.css" />
            <div class="title">
                ${this.title}   
            </div>
        `;
    }
}

customElements.define('page-header', PageHeader);