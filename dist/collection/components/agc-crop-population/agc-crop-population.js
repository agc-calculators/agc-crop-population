import { validate, round } from '../../utils';
export class AgcCropPopulation {
    constructor() {
        this.socket = "";
        this.tract = "";
        this.mode = 'step';
        this.units = { length: 'ft', spacing: 'in', land: 'acre' };
        this.currentStep = 0;
        this.cache = {};
        this.submitted = false;
        this.results = {};
    }
    render() {
        return (h("div", null,
            h("form", { onSubmit: (e) => e.preventDefault(), ref: c => this.form = c, "data-wizard": "agc-crop-population", "data-wizard-mode": this.mode, class: "agc-wizard" },
                h("slot", null),
                h("section", { "data-wizard-section": "1" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.stand-count" }, "Stand Count"),
                        h("input", { name: "standCount", type: "number", required: true, min: "1", step: "1" }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.stand-count.required", "data-validates": "standCount" }, "Please enter a whole number greater than zero."),
                        h("p", { "data-i18n": "hints.stand-count" }, "\u2BA4 Enter the number of plants counted in a given length of row.")),
                    h("div", { class: "agc-wizard__actions" }, this.mode === 'step' && h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Next \uD83E\uDC16"))),
                h("section", { "data-wizard-section": "2" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.row-length" }, "Length of Row"),
                        h("input", { name: "rowLength", type: "number", required: true, min: "1", step: "1" }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.row-length.required", "data-validates": "rowLength" }, "Please enter a whole number greater than zero."),
                        h("p", { "data-i18n": `hints.row-length.${this.units['length']}` }, "\u2BA4 Enter the length of the row in feet.")),
                    h("div", null, this.mode === 'step' && [h("button", { class: "agc-wizard__actions-back", "data-i18n": "actions.back", onClick: this.nextPrev.bind(this, -1) }, "\uD83E\uDC14 Back"),
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.next", onClick: this.nextPrev.bind(this, 1) }, "Next \uD83E\uDC16")])),
                h("section", { "data-wizard-section": "3" },
                    h("div", { class: "agc-wizard__field" },
                        h("label", { "data-i18n": "fields.row-spacing" }, "Row Spacing"),
                        h("input", { name: "rowSpacing", type: "number", required: true, min: "1", step: "1" }),
                        h("p", { class: "agc-wizard__validation-message", "data-i18n": "validation.row-spacing.required", "data-validates": "rowSpacing" }, "Please enter a whole number greater than zero."),
                        h("p", { "data-i18n": `hints.row-spacing.${this.units['spacing']}` }, "\u2BA4 Enter the row spacing in inches.")),
                    h("div", { class: "agc-wizard__actions" },
                        this.mode === 'step' && h("button", { class: "agc-wizard__actions-back", "data-i18n": "actions.back", onClick: this.nextPrev.bind(this, -1) }, "\uD83E\uDC14 Back"),
                        h("button", { class: "agc-wizard__actions-next", "data-i18n": "actions.finish", onClick: this.nextPrev.bind(this, this.mode === 'step' ? 1 : 3) }, "Calculate \uD83E\uDC16"))),
                h("section", { "data-wizard-results": true },
                    h("slot", { name: "results" })))));
    }
    showTab(n) {
        if (this.mode === 'step') {
            this.cache['sections'][n].style.display = "block";
        }
        if (this.socket) {
            this.agcStepChanged.emit({ socket: this.socket, tract: this.tract, step: this.currentStep });
        }
    }
    reset() {
        this.currentStep = 0;
        this.submitted = false;
        this.showTab(0);
    }
    validateForm() {
        let valid = true;
        if (this.currentStep === 0 || this.mode === 'full') {
            if (!validate(this.form, 'standCount')) {
                valid = false;
            }
        }
        if (this.currentStep === 1 || this.mode === 'full') {
            if (!validate(this.form, 'rowLength')) {
                valid = false;
            }
        }
        if (this.currentStep === 1 || this.mode === 'full') {
            if (!validate(this.form, 'rowSpacing')) {
                valid = false;
            }
        }
        return valid;
    }
    nextPrev(n, e) {
        e && e.preventDefault();
        if (this.mode === 'full') {
            if (!this.validateForm())
                return false;
        }
        else if (n == 1 && !this.validateForm())
            return false;
        if (this.mode === 'step') {
            this.cache['sections'][this.currentStep].style.display = "none";
        }
        this.currentStep = this.currentStep + n;
        if (this.currentStep >= this.cache['sections'].length) {
            this.submitted = true;
            this.showResults.call(this);
            return false;
        }
        this.showTab.call(this, this.currentStep);
    }
    showResults() {
        let standCount = parseInt(this.form.querySelector('[name="standCount"').value);
        let rowLength = round(this.form.querySelector('[name="rowLength"').value, 2);
        let rowSpacing = round(this.form.querySelector('[name="rowSpacing"').value, 2);
        const acreSqFt = 43560;
        let cropPopulation = round(standCount / (rowSpacing / 12 * rowLength / acreSqFt), 0);
        let results = {
            socket: this.socket,
            tract: this.tract,
            units: this.units,
            standCount,
            rowLength,
            rowSpacing,
            cropPopulation
        };
        if (this.socket) {
            this.agcCalculated.emit({ socket: this.socket, tract: this.tract, results: Object.assign({}, results) });
        }
        this.results = Object.assign({}, results);
        this.cache['results'].forEach(result => {
            result.style.display = 'block';
        });
    }
    handleAction(e) {
        if (e.detail['action'] === 'reset') {
            this.reset();
        }
    }
    componentDidLoad() {
        var sections = Array.from(this.form.querySelectorAll('[data-wizard-section]')).map(c => c).map(c => c);
        var results = Array.from(this.form.querySelectorAll('[data-wizard-results]')).map(c => c).map(c => c);
        this.cache = Object.assign({}, this.cache, { sections: sections, results: results });
        window.document.addEventListener('agcAction', this.handleAction.bind(this));
        this.form.querySelector('[name="first"]').defaultValue = 'Yup';
        this.showTab(0);
    }
    componentDidUnload() {
        window.document.removeEventListener('agcAction', this.handleAction);
    }
    static get is() { return "agc-crop-population"; }
    static get properties() { return {
        "cache": {
            "state": true
        },
        "currentStep": {
            "state": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "results": {
            "state": true
        },
        "socket": {
            "type": String,
            "attr": "socket"
        },
        "submitted": {
            "state": true
        },
        "tract": {
            "type": String,
            "attr": "tract"
        },
        "units": {
            "type": "Any",
            "attr": "units"
        }
    }; }
    static get events() { return [{
            "name": "agcCalculated",
            "method": "agcCalculated",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "agcStepChanged",
            "method": "agcStepChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}
