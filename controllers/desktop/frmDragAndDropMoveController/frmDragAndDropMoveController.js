define({ 

  dnd: null,

  onViewCreated(){
    this.view.init = () => {

      this.dnd = new DragAndDrop(this.view);

      this.dnd.makeDragArea(this.view.dragArea, this.dragCallback, this.endCallback);

      this.dnd.makeDraggable(this.view.redCircle, this.view.redCircle.clone(`${new Date().getTime()}`));

      this.dnd.makeDropArea(this.view.sourceArea, this.moveCallback, this.dropCallback);
      this.dnd.makeDropArea(this.view.targetArea, this.moveCallback, this.dropCallback);

      this.dnd.addSourceArea(this.view.sourceArea);
      this.dnd.addTargetArea(this.view.targetArea);

    };
  },

  dragCallback(draggedObject){},

  // right before the execution of the moveCallback, the DargAndDrop class has created the 
  // dragged object as a child of the drag area. The dragged object initially occupies 
  // the same spacial position as the source obejct. To give the feeling of moving the source object 
  // we have to make the source object itself invisible.
  moveCallback(draggedObject){
    this.dnd.getSourceObject().isVisible = false;
  },


  // if the dragged object is dropped outside the boundaries of a drop area, 
  // the endCallback is fired and the dragged object is deleted. To give the feeling 
  // that the dragged object gets back to its original position we make the source object visible again;
  endCallback(){
    this.dnd.getSourceObject().isVisible = true;
  },


  // this callback is fired when the draggedObject is dropped inside the drop area. We detach from the source object 
  // from the source area and we add it to the target area, at the same position of the dragged object.
  // The dragged object is automatically deleted after the execution of this callback.
  //
  dropCallback(draggedObject, dropArea){
    const {x, y} = dropArea.convertPointFromWidget(draggedObject.frame, this.view.dragArea);
    this.dnd.getSourceObject().isVisible = true;
    this.dnd.getSourceObject().removeFromParent();
    dropArea.add(this.dnd.getSourceObject());
    this.dnd.getSourceObject().left = x;
    this.dnd.getSourceObject().top = y;
    dropArea.forceLayout();
  }

});