define({ 
  dnd: null,

  onViewCreated(){
    this.view.init = () => {

      this.dnd = new DragAndDrop(this.view);

      this.dnd.makeDragArea(this.view.dragArea, this.dragCallback);

      this.dnd.makeDraggable(this.view.red, this.view.red.getDragClone(`square${new Date().getTime()}`));
      this.dnd.makeDraggable(this.view.blue, this.view.blue.getDragClone(`square${new Date().getTime()}`));
      this.dnd.makeDraggable(this.view.yellow, this.view.yellow.getDragClone(`square${new Date().getTime()}`));
      this.dnd.makeDraggable(this.view.black, this.view.black.getDragClone(`square${new Date().getTime()}`));
      this.dnd.makeDraggable(this.view.squareListArea, this.view.squareListArea.getDragClone(`squareListArea${new Date().getTime()}`));
      this.dnd.makeDraggable(this.view.squareSplitArea, this.view.squareSplitArea.getDragClone(`squareSplitArea${new Date().getTime()}`));

      this.dnd.makeDropArea(this.view.topDivider, this.moveCallback, this.dropCallback);

      this.dnd.addSourceArea(this.view.sourceArea);
      this.dnd.addTargetArea(this.view.targetArea);

    };
  },

  moveCallback(draggedObject, dropArea){
    dropArea.showTarget(true);
  },

  dragCallback(draggedObject){
    this.dnd.getTargetAreas().forEach((targetArea) => {
      targetArea.widgets().forEach((widget) => widget.showTarget && widget.showTarget(false));
    });
  },

  dropCallback(draggedObject, dropArea){

    const targetSkin = draggedObject.id.includes('rectangle') ? draggedObject.skinRectangle : draggedObject.skin;
    const targetArea = dropArea.parent;

    if(dropArea.id.includes('divider') || dropArea.id.includes('topDivider')){

      switch(draggedObject.className){
        case 'com.hcl.mario.Square':
          const rectangleId = `rectangle${new Date().getTime()}`;
          const rectangle = new com.hcl.mario.Rectangle({
            id: rectangleId,
          }, {}, {});
          rectangle.skinRectangle = targetSkin;
          rectangle.setDragAndDrop(this.dnd);
          const diviId = `divider${new Date().getTime()}`;
          const divi = new com.hcl.mario.Divider({
            id: diviId
          });

          rectangle.onDelete = () => {
            //             voltmx.sdk.logsdk.info(`onDelete: ${rectangleId} ${targetSkin}`);
            targetArea.remove(divi);
            this.dnd.removeDropArea(divi.id);
            targetArea.remove(rectangle);
            targetArea.forceLayout();
          };

          const ind = targetArea.widgets().findIndex((widget) => {
            return widget.id === dropArea.id;
          });
          if(ind > -1){
            targetArea.addAt(rectangle, ind + 1);
            targetArea.addAt(divi, ind + 2);

            dropArea.showTarget(false);
            this.dnd.makeDropArea(divi, this.moveCallback, this.dropCallback);
            this.dnd.makeDraggable(rectangle, rectangle.getDragClone(`rectangle${new Date().getTime()}`));
          } else {
            alert('error');
          }
          break;

        case 'com.hcl.mario.SquareListArea':
          const listAreaContainerId = `listAreaContainer${new Date().getTime()}`;
          const listAreaContainer = new voltmx.ui.FlexContainer({
            id: listAreaContainerId,
            "autogrowMode": voltmx.flex.AUTOGROW_HEIGHT,
            "layoutType": voltmx.flex.FREE_FORM,
            skin: 'skinDarkGrey'
          }, {}, {});

          const listArea = new voltmx.ui.FlexContainer({
            id: `listArea${new Date().getTime()}`,
            "autogrowMode": voltmx.flex.AUTOGROW_HEIGHT,
            skin: 'skinGrey',
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            width: '90%',
            centerX: '50%',
            top: '50dp',
            bottom: '10dp'
          }, {}, {});

          const divider1 = new com.hcl.mario.Divider({
            id: `topDividerListArea${new Date().getTime()}`
          });
          const divider2 = new com.hcl.mario.Divider({
            id: `divider2${new Date().getTime()}`
          });

          const deleteButton = this.getDeleteButton();
          listAreaContainer.add(deleteButton);
          listArea.add(divider1);
          listAreaContainer.add(listArea);

          deleteButton.onTouchStart = () => {
            this.dnd.suspendEvents(true);
            globals.objectToDelete || (globals.objectToDelete = listAreaContainerId);
          };
          deleteButton.onTouchEnd = () => {
            if(globals.objectToDelete === listAreaContainerId){
              listAreaContainer.parent.remove(divider2);
              this.dnd.removeDropArea(divider2.id);
              const listArea = listAreaContainer.widgets().find((widget) => widget.id.startsWith('listArea'));
              listArea.widgets().forEach((widget) => widget.className === 'com.hcl.mario.Divider' && (this.dnd.removeDropArea(widget.id)));
              listAreaContainer.parent.remove(listAreaContainer);
              listAreaContainer.parent.forceLayout();
            }
            voltmx.timer.schedule('timer1', () => {
              globals.objectToDelete = null;
              this.dnd.suspendEvents(false);
            }, 0.3);

          };

          const ind2 = targetArea.widgets().findIndex((widget) => {
            return widget.id === dropArea.id;
          });

          if(ind2 > -1){
            targetArea.addAt(listAreaContainer, ind2 + 1);
            targetArea.addAt(divider2, ind2 + 2);
            dropArea.showTarget(false);
            this.dnd.makeDropArea(divider1, this.moveCallback, this.dropCallback);
            this.dnd.makeDropArea(divider2, this.moveCallback, this.dropCallback);
            this.dnd.addTargetArea(listArea);
            targetArea.parent.forceLayout();
          } else {
            alert('error');
          }
          break;

        case 'com.hcl.mario.SquareSplitArea':
          const splitAreaId = `splitArea${new Date().getTime()}`;
          const splitArea = new voltmx.ui.FlexContainer({
            id: splitAreaId,
            "autogrowMode": voltmx.flex.AUTOGROW_HEIGHT,
            "layoutType": voltmx.flex.FREE_FORM,
            skin: 'skinDarkGrey'
          }, {}, {});
          const splitLeft = new voltmx.ui.FlexContainer({
            id: `splitLeft${new Date().getTime()}`,
            "autogrowMode": voltmx.flex.AUTOGROW_HEIGHT,
            skin: 'skinGrey',
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            width: '47%',
            left: '2%',
            top: '50dp',
            bottom: '10dp'
          }, {}, {});
          const splitRight = new voltmx.ui.FlexContainer({
            id: `splitRight${new Date().getTime()}`,
            "autogrowMode": voltmx.flex.AUTOGROW_HEIGHT,
            skin: 'skinGrey',
            "layoutType": voltmx.flex.FLOW_VERTICAL,
            width: '47%',
            right: '2%',
            top: '50dp',
            bottom: '10dp'
          }, {}, {});
          const topDividerLeft = new com.hcl.mario.Divider({
            id: `topDividerLeft${new Date().getTime()}`
          });
          const topDividerRight = new com.hcl.mario.Divider({
            id: `topDividerRight${new Date().getTime()}`
          });
          const divider3 = new com.hcl.mario.Divider({
            id: `divider3${new Date().getTime()}`
          });
          const deleteButtonSplit = this.getDeleteButton();

          splitLeft.add(topDividerLeft);
          splitRight.add(topDividerRight);
          splitArea.add(deleteButtonSplit);
          splitArea.add(splitLeft);
          splitArea.add(splitRight);

          deleteButtonSplit.onTouchStart = () => {
            this.dnd.suspendEvents(true);
            globals.objectToDelete || (globals.objectToDelete = splitAreaId);
          };
          deleteButtonSplit.onTouchEnd = () => {
            if(globals.objectToDelete === splitAreaId){
              splitArea.parent.remove(divider3);
              this.dnd.removeDropArea(divider3.id);
              const splitLeft = splitArea.widgets().find((widget) => widget.id.startsWith('splitLeft'));
              splitLeft.widgets().forEach((widget) => widget.className === 'com.hcl.mario.Divider' && (this.dnd.removeDropArea(widget.id)));
              const splitRight = splitArea.widgets().find((widget) => widget.id.startsWith('splitRight'));
              splitRight.widgets().forEach((widget) => widget.className === 'com.hcl.mario.Divider' && (this.dnd.removeDropArea(widget.id)));
              splitArea.parent.remove(splitArea);
              splitArea.parent.forceLayout();
            }
            voltmx.timer.schedule('timer2', () => {
              globals.objectToDelete = null;
              this.dnd.suspendEvents(false);
            }, 0.3);
          };

          const ind3 = targetArea.widgets().findIndex((widget) => {
            return widget.id === dropArea.id;
          });
          if(ind3 > -1){
            targetArea.addAt(splitArea, ind3 + 1);
            targetArea.addAt(divider3, ind3 + 2);
            dropArea.showTarget(false);
            this.dnd.makeDropArea(topDividerLeft, this.moveCallback, this.dropCallback);
            this.dnd.makeDropArea(topDividerRight, this.moveCallback, this.dropCallback);
            this.dnd.makeDropArea(divider3, this.moveCallback, this.dropCallback);
            this.dnd.addTargetArea(splitLeft);
            this.dnd.addTargetArea(splitRight);
            targetArea.parent.forceLayout();
          } else {
            alert('error');
          }
          break;

        case 'com.hcl.mario.Rectangle':
          const sourceArea = this.dnd.getSourceObject().parent;
          const i = sourceArea.widgets().findIndex((widget) => widget.id === this.dnd.getSourceObject().id);
          if(i > -1){
            const divider = sourceArea.widgets()[i + 1];
            if(divider.id !== dropArea.id){
              this.dnd.getSourceObject().removeFromParent();
              divider.removeFromParent();
              const index = targetArea.widgets().findIndex((widget) => widget.id === dropArea.id);
              targetArea.addAt(this.dnd.getSourceObject(), index + 1);
              targetArea.addAt(divider, index + 2);
              dropArea.showTarget(false);
            }
          } else {
            alert('error');
          }
          break;

        default:
          break;
      }

      this.dnd.getTargetAreas().forEach((targetArea) => {
        targetArea.widgets().forEach((widget) => {
          widget.showTarget && widget.showTarget(false);
          widget.forceLayout();
        });
        targetArea.forceLayout();
        targetArea.parent.forceLayout();
      });
    }
  },

  getDeleteButton(){
    var flxDelete = new voltmx.ui.FlexContainer({
      "autogrowMode": voltmx.flex.AUTOGROW_NONE,
      "clipBounds": false,
      "height": "40dp",
      "id": `flxDelete${new Date().getTime()}`,
      "isVisible": true,
      "layoutType": voltmx.flex.FREE_FORM,
      "isModalContainer": false,
      "right": 0,
      "skin": "slFbox",
      "top": "0dp",
      "width": "40dp",
      "appName": "DragAndDrop"
    }, {
      "paddingInPixel": false
    }, {});
    flxDelete.setDefaultUnit(voltmx.flex.DP);
    var lblDelete = new voltmx.ui.Label({
      "height": "40dp",
      "id": `lblDelete${new Date().getTime()}`,
      "isVisible": true,
      "right": 0,
      "skin": "skinIcon",
      "text": "",
      "textStyle": {},
      "top": "0dp",
      "width": "40dp",
      "zIndex": 1
    }, {
      "contentAlignment": constants.CONTENT_ALIGN_CENTER,
      "padding": [0, 0, 0, 0],
      "paddingInPixel": false
    }, {});
    flxDelete.add(lblDelete);
    return flxDelete;
  }

});