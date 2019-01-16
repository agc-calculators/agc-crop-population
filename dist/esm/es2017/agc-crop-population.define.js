
// AgcCropPopulation: Custom Elements Define Library, ES Module/es2017 Target

import { defineCustomElement } from './agc-crop-population.core.js';
import {
  AgcCropPopulation,
  AgcCropPopulationExplanation,
  AgcCropPopulationInputs,
  AgcCropPopulationProgress,
  AgcCropPopulationResults,
  AgcCropPopulationResultsPlaceholder
} from './agc-crop-population.components.js';

export function defineCustomElements(win, opts) {
  return defineCustomElement(win, [
    AgcCropPopulation,
    AgcCropPopulationExplanation,
    AgcCropPopulationInputs,
    AgcCropPopulationProgress,
    AgcCropPopulationResults,
    AgcCropPopulationResultsPlaceholder
  ], opts);
}
