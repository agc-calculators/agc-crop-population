
import { Component } from '@stencil/core';


@Component({
    tag: 'agc-crop-population-results-placeholder'
})
export class AgcCropPopulationResultsPlaceholder {

    render() {
        const placeholder = () => <span><i class="mark"></i> <i class="mark"></i> <i class="mark"></i> <i class="mark"></i></span>

        return (
            <section>
                <ul class="agc-results-placeholder">
                    <li>
                        <h2 data-i18n="results.crop-population">Crop Population</h2>
                        {placeholder()}
                    </li>                                      
                </ul>
            </section>
        );
    }
}