
import { Component, Prop, State } from '@stencil/core';


@Component({
    tag: 'agc-crop-population-explanation'
})
export class AgcCropPopulationExplanation {
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
                    {this.data && (<p>
                        {this.data['standCount']} plants counted in a {this.data['rowLength']}{this.data['units']['length']} section of row ({this.data['rowSpacing']}{this.data['units']['spacing']} spacing) would have an estimated crop population of {this.data['cropPopulation']} plants/{this.data['units']['land']}.
                    </p>)}
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
