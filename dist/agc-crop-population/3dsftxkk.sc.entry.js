/*! Built with http://stenciljs.com */
const{h:t}=window.AgcCropPopulation;class s{constructor(){this.socket="",this.ready=!1}render(){return t("section",{"data-wizard-results":!0,ref:t=>this.section=t},t("div",{style:{display:this.ready?"none":"block"}},t("slot",{name:"empty"})),t("div",{style:{display:this.ready?"block":"none"}},this.data&&t("ul",{class:"agc-results"},t("li",null,t("h2",{"data-i18n":"results.crop-population"},"Crop Population"),t("span",{class:"agc-results__value"},this.data.cropPopulation),t("sub",{"data-i18n":`results.plants-${this.data.units.land}`},"plants/",this.data.units.land)))))}handleResults(t){t.detail.socket===this.socket&&(this.data=Object.assign({},t.detail.results),this.ready=!0)}componentDidLoad(){this.socket&&window.document.addEventListener("agcCalculated",this.handleResults.bind(this))}componentDidUnload(){window.document.removeEventListener("agcCalculated",this.handleResults)}static get is(){return"agc-crop-population-results"}static get properties(){return{data:{state:!0},ready:{state:!0},socket:{type:String,attr:"socket"}}}}export{s as AgcCropPopulationResults};