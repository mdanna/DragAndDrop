define(function() {
  return {
    constructor(baseConfig, layoutConfig, pspConfig) {
      this.view.flxDelete.onTouchStart = () => {
        if(!this._dnd.eventsSuspended()){
//           voltmx.sdk.logsdk.info(`onTouchStart: ${this.view.id} ${this.view.flxRectangle.skin}`);
          this._dnd.suspendEvents(true);
          globals.objectToDelete || (globals.objectToDelete = this.view.id);
        }
      };

      this.view.flxDelete.onTouchEnd = () => {
        if(globals.objectToDelete === this.view.id){
//           voltmx.sdk.logsdk.info(`onTouchEnd: ${this.view.id} ${this.view.flxRectangle.skin}`);
          this.onDelete();
          voltmx.timer.schedule('rectangleTimer', () => {
            globals.objectToDelete = null;
            this._dnd.suspendEvents(false);
          }, 0.3);
        }
      };
    },

    initGettersSetters() {},

    onDelete(){},

    getDragClone(id){
      const rectangle = new com.hcl.mario.Rectangle({id}, {}, {});  
      rectangle.skinRectangle = this.view.flxRectangle.skin;
      rectangle.setDragAndDrop(this._dnd);
      return rectangle;
    },
    
    setDragAndDrop(dnd){
      this._dnd = dnd;
    }
  };
});