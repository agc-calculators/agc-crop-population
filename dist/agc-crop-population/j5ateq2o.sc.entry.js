/*! Built with http://stenciljs.com */
const{h:t}=window.AgcCropPopulation;class a{constructor(){this.socket="",this.ready=!1}render(){return t("section",{"data-wizard-results":!0,ref:t=>this.section=t},t("div",{style:{display:this.ready?"none":"block"}},t("slot",{name:"empty"})),t("div",{style:{display:this.ready?"block":"none"}},this.data&&t("p",null,this.data.standCount," plants counted in a ",this.data.rowLength,this.data.units.length," section of row (",this.data.rowSpacing,this.data.units.spacing," spacing) would have an estimated crop population of ",this.data.cropPopulation," plants/",this.data.units.land,".")))}handleResults(t){t.detail.socket===this.socket&&(this.data=Object.assign({},t.detail.results),this.ready=!0)}componentDidLoad(){this.socket&&window.document.addEventListener("agcCalculated",this.handleResults.bind(this))}componentDidUnload(){window.document.removeEventListener("agcCalculated",this.handleResults)}static get is(){return"agc-crop-population-explanation"}static get properties(){return{data:{state:!0},ready:{state:!0},socket:{type:String,attr:"socket"}}}}export{a as AgcCropPopulationExplanation};