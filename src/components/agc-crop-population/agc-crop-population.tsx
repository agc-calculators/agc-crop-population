
import { Component, State, Event, EventEmitter, Prop } from '@stencil/core';
import { validate, round } from '../../utils'

@Component({
    tag: 'agc-crop-population'
})
export class AgcCropPopulation {

    @Prop() socket: string = ""
    @Prop() tract: string = ""
    @Prop() mode: 'full' | 'step' = 'step'
    @Prop() units: any = { length: 'ft', spacing: 'in', land: 'acre' }
    @State() currentStep = 0
    @State() cache = {}
    @State() submitted = false
    @State() results = {}
    @Event({
        eventName: 'agcCalculated'
      }) agcCalculated: EventEmitter;
    @Event({
        eventName: 'agcStepChanged'
    }) agcStepChanged: EventEmitter;

    form: HTMLFormElement

    render() {
        return (
            <div>
                <form onSubmit={(e) => e.preventDefault()} ref={c => this.form = c as HTMLFormElement} data-wizard="agc-crop-population" 
                    data-wizard-mode={this.mode}
                    class="agc-wizard">
                    <slot></slot>
                    <section data-wizard-section="1">
                      <div class="agc-wizard__field">
                        <label data-i18n="fields.stand-count">Stand Count</label>
                        <input name="standCount" type="number" required min="1" step="1" />
                        <p class="agc-wizard__validation-message" data-i18n="validation.stand-count.required" data-validates="standCount">Please enter a whole number greater than zero.</p>
                        <p data-i18n="hints.stand-count">⮤ Enter the number of plants counted in a given length of row.</p>
                      </div>
                      <div class="agc-wizard__actions">
                        {this.mode === 'step' && <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next 🠖</button>}
                      </div>
                    </section>
                    <section data-wizard-section="2">
                      <div class="agc-wizard__field">
                        <label data-i18n="fields.row-length">Length of Row</label>
                        <input name="rowLength" type="number" required min="1" step="1" />
                        <p class="agc-wizard__validation-message" data-i18n="validation.row-length.required" data-validates="rowLength">Please enter a whole number greater than zero.</p>
                        <p data-i18n={`hints.row-length.${this.units['length']}`}>⮤ Enter the length of the row in feet.</p>
                      </div>
                      <div>
                        {this.mode === 'step' && [<button class="agc-wizard__actions-back" data-i18n="actions.back" onClick={this.nextPrev.bind(this, -1)}>🠔 Back</button>,
                           <button class="agc-wizard__actions-next" data-i18n="actions.next" onClick={this.nextPrev.bind(this, 1)}>Next 🠖</button>]}                        
                      </div>
                    </section>
                    <section data-wizard-section="3">
                      <div class="agc-wizard__field">
                        <label data-i18n="fields.row-spacing">Row Spacing</label>
                        <input name="rowSpacing" type="number" required min="1" step="1" />
                        <p class="agc-wizard__validation-message" data-i18n="validation.row-spacing.required" data-validates="rowSpacing">Please enter a whole number greater than zero.</p>
                        <p data-i18n={`hints.row-spacing.${this.units['spacing']}`}>⮤ Enter the row spacing in inches.</p>
                      </div>
                      <div class="agc-wizard__actions">
                        {this.mode === 'step' && <button class="agc-wizard__actions-back" data-i18n="actions.back" onClick={this.nextPrev.bind(this, -1)}>🠔 Back</button>}
                        <button class="agc-wizard__actions-next" data-i18n="actions.finish" onClick={this.nextPrev.bind(this, this.mode === 'step' ? 1 : 3)}>Calculate 🠖</button>
                      </div>
                    </section>
                    <section data-wizard-results>                        
                        <slot name="results"></slot>                     
                    </section>
                </form>
            </div>
        );
    }

    showTab(n) {
        // This function will display the specified section of the form... 
        if (this.mode === 'step') {       
            this.cache['sections'][n].style.display = "block";
        }

        if (this.socket) {
            this.agcStepChanged.emit({socket: this.socket, tract: this.tract, step: this.currentStep})
        }
    }

    reset() {
        this.currentStep = 0
        this.submitted = false
        this.showTab(0)
    }

    validateForm () {
        let valid = true;

        if (this.currentStep === 0 || this.mode === 'full') {
            if (!validate(this.form, 'standCount')) {
                valid = false
            }
        }

        if (this.currentStep === 1 || this.mode === 'full') {
            if (!validate(this.form, 'rowLength')) {
                valid = false
            }
        }
        
        if (this.currentStep === 1 || this.mode === 'full') {
            if (!validate(this.form, 'rowSpacing')) {
                valid = false
            }
        }

        return valid;
    }

    nextPrev(n, e) {
        e && e.preventDefault()
        if (this.mode === 'full') {
            if (!this.validateForm()) return false
        } else if (n == 1 && !this.validateForm()) return false

        // Hide the current tab:
        if (this.mode === 'step') {
            this.cache['sections'][this.currentStep].style.display = "none"
        }
        // Increase or decrease the current tab by 1:
        this.currentStep = this.currentStep + n
        // if you have reached the end of the form...
        if (this.currentStep >= this.cache['sections'].length) {
            // ... the form gets submitted:
            this.submitted = true
            this.showResults.call(this);
            return false;
        }
        // Otherwise, display the correct tab:
        this.showTab.call(this, this.currentStep);
    }

    showResults() {
        let standCount =  parseInt((this.form.querySelector('[name="standCount"') as HTMLInputElement).value);  
        let rowLength =  round((this.form.querySelector('[name="rowLength"') as HTMLInputElement).value, 2);  
        let rowSpacing =  round((this.form.querySelector('[name="rowSpacing"') as HTMLInputElement).value, 2); 

        const acreSqFt = 43560
        let cropPopulation  = round(standCount / (rowSpacing / 12 * rowLength / acreSqFt), 0)

        let results = {
            socket: this.socket,
            tract: this.tract,
            units: this.units,
            standCount,
            rowLength,
            rowSpacing,
            cropPopulation
        }

        if (this.socket) {
            this.agcCalculated.emit({socket: this.socket, tract: this.tract, results: {...results}})
        }

        this.results = {...results}
        
        this.cache['results'].forEach(result => {
            result.style.display = 'block'
        })
    }

    handleAction(e:CustomEvent) {
        if (e.detail['action'] === 'reset') {
            this.reset();
        }
    }

    componentDidLoad() {
        var sections = Array.from(this.form.querySelectorAll('[data-wizard-section]')).map(c => c as any).map(c => c as HTMLElement)
        var results = Array.from(this.form.querySelectorAll('[data-wizard-results]')).map(c => c as any).map(c => c as HTMLElement)
        this.cache = {...this.cache, sections: sections, results: results}

        window.document.addEventListener('agcAction', this.handleAction.bind(this));

        (this.form.querySelector('[name="first"]') as HTMLInputElement)!.defaultValue = 'Yup';

        this.showTab(0)
    }

    componentDidUnload() {
        window.document.removeEventListener('agcAction', this.handleAction);
    }
}