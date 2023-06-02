define(function() {
  return {
    constructor(baseConfig, layoutConfig, pspConfig) {
      this.view.flxDelete.onTouchStart = () => {
        if(!DragAndDrop.suspendEvents){
//           voltmx.sdk.logsdk.info(`onTouchStart: ${this.view.id} ${this.view.flxRectangle.skin}`);
          DragAndDrop.suspendEvents = true;
          globals.objectToDelete || (globals.objectToDelete = this.view.id);
        }
      };

      this.view.flxDelete.onTouchEnd = () => {
        if(globals.objectToDelete === this.view.id){
//           voltmx.sdk.logsdk.info(`onTouchEnd: ${this.view.id} ${this.view.flxRectangle.skin}`);
          this.onDelete();
          setTimeout(() => {
            globals.objectToDelete = null;
            DragAndDrop.suspendEvents = false;
          }, 300);
        }
      };
    },

    initGettersSetters() {},

    onDelete(){},

    getDragClone(id){
      const rectangle = new com.hcl.mario.Rectangle({id}, {}, {});  
      rectangle.skinRectangle = this.view.flxRectangle.skin;
      return rectangle;
    }
  };
});