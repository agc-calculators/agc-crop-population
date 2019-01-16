/*! Built with http://stenciljs.com */
import { h } from '../agc-crop-population.core.js';

class AgcCropPopulationInputs {
    constructor() {
        this.socket = "";
        this.ready = false;
    }
    render() {
        return (h("section", { "data-wizard-results": true, ref: c => this.section = c },
            h("div", { style: { display: this.ready ? 'none' : 'block' } },
                h("slot", { name: "empty" })),
            h("div", { style: { display: this.ready ? 'block' : 'none' } }, this.data && (h("ul", { class: "agc-results" },
                h("li", null,
                    h("h2", { "data-i18n": "results.stand-count" }, "Stand Count"),
                    h("span", { class: "agc-results__value" }, this.data['standCount']),
                    h("sub", { "data-i18n": `results.plants` }, "plants")),
                h("li", null,
                    h("h2", { "data-i18n": "results.row-length" }, "Row Length"),
                    h("span", { class: "agc-results__value" }, this.data['rowLength']),
                    h("sub", { "data-i18n": `results.length.${this.data['units']['length']}` }, this.data['units']['length'])),
                h("li", null,
                    h("h2", { "data-i18n": "results.row-spacing" }, "Row Spacing"),
                    h("span", { class: "agc-results__value" }, this.data['rowSpacing']),
                    h("sub", { "data-i18n": `results.spacing.${this.data['units']['spacing']}` }, this.data['units']['spacing'])))))));
    }
    handleResults(e) {
        if (e.detail['socket'] !== this.socket) {
            return;
        }
        this.data = Object.assign({}, e.detail['results']);
        this.ready = true;
    }
    componentDidLoad() {
        if (!this.socket) {
            return;
        }
        window.document.addEventListener('agcCalculated', this.handleResults.bind(this));
    }
    componentDidUnload() {
        window.document.removeEventListener('agcCalculated', this.handleResults);
    }
    static get is() { return "agc-crop-population-inputs"; }
    static get properties() { return {
        "data": {
            "state": true
        },
        "ready": {
            "state": true
        },
        "socket": {
            "type": String,
            "attr": "socket"
        }
    }; }
}

export { AgcCropPopulationInputs };
