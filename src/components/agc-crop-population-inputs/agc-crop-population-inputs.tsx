
import { Component, Prop, State } from '@stencil/core';


@Component({
    tag: 'agc-crop-population-inputs'
})
export class AgcCropPopulationInputs {
    @Prop() socket: string = ""
    @State() data: any
    @State() ready: boolean = false
    section: HTMLElement;

    render() {
        return (
            <section data-wizard-results ref={c => this.section = c as HTMLElement}>
                <div style={{display: this.ready ? 'none' : 'block'}}>
                    <slot name="empty"></slot>
                </div>

                <div style={{display: this.ready ? 'block' : 'none'}}>
                    {this.data && (<ul class="agc-results">
                            <li>
                                <h2 data-i18n="results.stand-count">Stand Count</h2>
                                <span class="agc-results__value">{this.data['standCount']}</span>
                                <sub data-i18n={`results.plants`}>plants</sub>
                            </li>
                            <li>
                                <h2 data-i18n="results.row-length">Row Length</h2>
                                <span class="agc-results__value">{this.data['rowLength']}</span>
                                <sub data-i18n={`results.length.${this.data['units']['length']}`}>{this.data['units']['length']}</sub>
                            </li>
                            <li>
                                <h2 data-i18n="results.row-spacing">Row Spacing</h2>
                                <span class="agc-results__value">{this.data['rowSpacing']}</span>
                                <sub data-i18n={`results.spacing.${this.data['units']['spacing']}`}>{this.data['units']['spacing']}</sub>
                            </li>                     
                        </ul>)}
                </div>
            </section>
        );
    }

    handleResults(e:CustomEvent) {
        if (e.detail['socket'] !== this.socket) { return; }
        this.data = {...e.detail['results']};
        this.ready = true;
    }

    componentDidLoad() {
        // Global events allow the control to be separated from the form...
        if (!this.socket) {
            return;
        }
        window.document.addEventListener('agcCalculated', this.handleResults.bind(this));
    }

    componentDidUnload() {
        window.document.removeEventListener('agcCalculated', this.handleResults);
    }
}
