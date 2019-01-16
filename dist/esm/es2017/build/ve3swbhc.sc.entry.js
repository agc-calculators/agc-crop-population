/*! Built with http://stenciljs.com */
import { h } from '../agc-crop-population.core.js';

class AgcCropPopulationResultsPlaceholder {
    render() {
        const placeholder = () => h("span", null,
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }),
            " ",
            h("i", { class: "mark" }));
        return (h("section", null,
            h("ul", { class: "agc-results-placeholder" },
                h("li", null,
                    h("h2", { "data-i18n": "results.crop-population" }, "Crop Population"),
                    placeholder()))));
    }
    static get is() { return "agc-crop-population-results-placeholder"; }
}

export { AgcCropPopulationResultsPlaceholder };
