/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import '@stencil/core';




export namespace Components {

  interface AgcCropPopulationExplanation {
    'socket': string;
  }
  interface AgcCropPopulationExplanationAttributes extends StencilHTMLAttributes {
    'socket'?: string;
  }

  interface AgcCropPopulationInputs {
    'socket': string;
  }
  interface AgcCropPopulationInputsAttributes extends StencilHTMLAttributes {
    'socket'?: string;
  }

  interface AgcCropPopulationProgress {
    'socket': string;
  }
  interface AgcCropPopulationProgressAttributes extends StencilHTMLAttributes {
    'socket'?: string;
  }

  interface AgcCropPopulationResultsPlaceholder {}
  interface AgcCropPopulationResultsPlaceholderAttributes extends StencilHTMLAttributes {}

  interface AgcCropPopulationResults {
    'socket': string;
  }
  interface AgcCropPopulationResultsAttributes extends StencilHTMLAttributes {
    'socket'?: string;
  }

  interface AgcCropPopulation {
    'mode': 'full' | 'step';
    'socket': string;
    'tract': string;
    'units': any;
  }
  interface AgcCropPopulationAttributes extends StencilHTMLAttributes {
    'mode'?: 'full' | 'step';
    'onAgcCalculated'?: (event: CustomEvent) => void;
    'onAgcStepChanged'?: (event: CustomEvent) => void;
    'socket'?: string;
    'tract'?: string;
    'units'?: any;
  }
}

declare global {
  interface StencilElementInterfaces {
    'AgcCropPopulationExplanation': Components.AgcCropPopulationExplanation;
    'AgcCropPopulationInputs': Components.AgcCropPopulationInputs;
    'AgcCropPopulationProgress': Components.AgcCropPopulationProgress;
    'AgcCropPopulationResultsPlaceholder': Components.AgcCropPopulationResultsPlaceholder;
    'AgcCropPopulationResults': Components.AgcCropPopulationResults;
    'AgcCropPopulation': Components.AgcCropPopulation;
  }

  interface StencilIntrinsicElements {
    'agc-crop-population-explanation': Components.AgcCropPopulationExplanationAttributes;
    'agc-crop-population-inputs': Components.AgcCropPopulationInputsAttributes;
    'agc-crop-population-progress': Components.AgcCropPopulationProgressAttributes;
    'agc-crop-population-results-placeholder': Components.AgcCropPopulationResultsPlaceholderAttributes;
    'agc-crop-population-results': Components.AgcCropPopulationResultsAttributes;
    'agc-crop-population': Components.AgcCropPopulationAttributes;
  }


  interface HTMLAgcCropPopulationExplanationElement extends Components.AgcCropPopulationExplanation, HTMLStencilElement {}
  var HTMLAgcCropPopulationExplanationElement: {
    prototype: HTMLAgcCropPopulationExplanationElement;
    new (): HTMLAgcCropPopulationExplanationElement;
  };

  interface HTMLAgcCropPopulationInputsElement extends Components.AgcCropPopulationInputs, HTMLStencilElement {}
  var HTMLAgcCropPopulationInputsElement: {
    prototype: HTMLAgcCropPopulationInputsElement;
    new (): HTMLAgcCropPopulationInputsElement;
  };

  interface HTMLAgcCropPopulationProgressElement extends Components.AgcCropPopulationProgress, HTMLStencilElement {}
  var HTMLAgcCropPopulationProgressElement: {
    prototype: HTMLAgcCropPopulationProgressElement;
    new (): HTMLAgcCropPopulationProgressElement;
  };

  interface HTMLAgcCropPopulationResultsPlaceholderElement extends Components.AgcCropPopulationResultsPlaceholder, HTMLStencilElement {}
  var HTMLAgcCropPopulationResultsPlaceholderElement: {
    prototype: HTMLAgcCropPopulationResultsPlaceholderElement;
    new (): HTMLAgcCropPopulationResultsPlaceholderElement;
  };

  interface HTMLAgcCropPopulationResultsElement extends Components.AgcCropPopulationResults, HTMLStencilElement {}
  var HTMLAgcCropPopulationResultsElement: {
    prototype: HTMLAgcCropPopulationResultsElement;
    new (): HTMLAgcCropPopulationResultsElement;
  };

  interface HTMLAgcCropPopulationElement extends Components.AgcCropPopulation, HTMLStencilElement {}
  var HTMLAgcCropPopulationElement: {
    prototype: HTMLAgcCropPopulationElement;
    new (): HTMLAgcCropPopulationElement;
  };

  interface HTMLElementTagNameMap {
    'agc-crop-population-explanation': HTMLAgcCropPopulationExplanationElement
    'agc-crop-population-inputs': HTMLAgcCropPopulationInputsElement
    'agc-crop-population-progress': HTMLAgcCropPopulationProgressElement
    'agc-crop-population-results-placeholder': HTMLAgcCropPopulationResultsPlaceholderElement
    'agc-crop-population-results': HTMLAgcCropPopulationResultsElement
    'agc-crop-population': HTMLAgcCropPopulationElement
  }

  interface ElementTagNameMap {
    'agc-crop-population-explanation': HTMLAgcCropPopulationExplanationElement;
    'agc-crop-population-inputs': HTMLAgcCropPopulationInputsElement;
    'agc-crop-population-progress': HTMLAgcCropPopulationProgressElement;
    'agc-crop-population-results-placeholder': HTMLAgcCropPopulationResultsPlaceholderElement;
    'agc-crop-population-results': HTMLAgcCropPopulationResultsElement;
    'agc-crop-population': HTMLAgcCropPopulationElement;
  }


  export namespace JSX {
    export interface Element {}
    export interface IntrinsicElements extends StencilIntrinsicElements {
      [tagName: string]: any;
    }
  }
  export interface HTMLAttributes extends StencilHTMLAttributes {}

}