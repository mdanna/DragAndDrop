define(function() {

  return {
    constructor: function(baseConfig, layoutConfig, pspConfig) {

    },
    //Logic for getters/setters of custom properties
    initGettersSetters: function() {

    },

    getDragClone(id){
      return new com.hcl.mario.Square({
        id,
        skin: this.view.skin
      }, {}, {});
    }
  };
});