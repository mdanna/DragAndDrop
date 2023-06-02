define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {
    },

    showTarget(visible){
      this.view.flxTarget.setVisibility(visible);
      this.view.flxTarget.height = visible ? '70dp' : '0dp';
      this.view.height = visible ? '80dp': '10dp';
      this.view.flxTarget.forceLayout();
      this.view.forceLayout();
    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    }
  };
});