# DragAndDrop
The DragAndDrop class may be used to implement a drag and drop context inside a form.
The DragAndDrop class deals with the following concepts:

- the Drag Area is the container where the drag and drop action takes place. The Source Areas and the Target Areas must be defined
within the boundaries of the Drag Area. The Drag Area typically is as big as the form itself.

- a Source Area is a container which is the parent of the objects where the drag action originates. 

- the Source Object is the object on which the drag and drop action originates. 

- the Dragged Object is the object that is dragged during the drag and drop action. 
A dragged Object is typically a clone of the Source Object and it is a child of the Drag Area.

- a Target Area is a container an the object is moved/created as a result of a drop action. 

- a Drop Area is a container where the drop action takes place. A Drop Area must be either a Target Area itself
or a direct child of a Target Area.

- the dragCallback is a callback fired when the object is dragged outside the boundaries of any Drop Area

- the endCallback is a callback fired when the object is dropped outside the boundaries of any Drop Area. After calling
this callback the lifecycle of the dragged object ends and the draggedObject is deleted fro the drag area.

- the moveCallback is a callback fired when the object is dragged within the boundaries of a Drop Area

- the dropCallback is a callback fired when the object is dropped within the boundaries of a Drop Area. After calling
this callback the lifecycle of the dragged object ends and the draggedObject is deleted fro the drag area.

------------------ Doc for the DragAndDrop class -----------

Creates an instance of the DragAndDrop class.
view: the reference to the current view

constructor(view)

---
  
When true all event callbacks of all instances of the DragAndDrop class are not executed. 

static suspendEvents

---

Returns an array of objects each of which represents a drop area and its related callbacks
[{dropArea, moveCallback, dropCallback}, ...] as defined in the makeDropArea method.

getDropAreas()

---

Return an array of references to all currently defined Target Areas.

getTargetAreas()
  
---

Removes a drop area from the list of existing drop areas. One must call this method upon
removal of a drop area from a target area.

id: id of the drop area.
removeDropArea(id)

---

Return the reference to the source object, on which the drag and drop actions originated.

getSourceObject()

---

Defines a given flex container as a target area.

targetArea: the reference to a flex container.
addTargetArea(targetArea)

---

Defines a given flex container as a source area.

sourceArea: the reference to a flex container.
addSourceArea(sourceArea)

---

This is an utility method used to check wheter a given widget is a direct child of any of the areas specified.

widget: the reference to a widget.
areas: an array of flex containers.
existsInArea(widget, areas)

---

Defines a given object as the origin of a drag and drop action.
Remark: the source object is a child of the Source Area while the dragged object is a child of the dragged area.

sourceObject: the source object for the drag and drop action.
draggedObject: the reference to the object which is actually dragged. This is typically a clone of the source object.
makeDraggable(sourceObject, draggedObject)

---

Defines the drag area for the drag and drop action. That is the flex container within 
which boundaries an object can be dragged.

dragArea: the reference to the flex container which is defined as the drag area
dragCallback: fired when the draggedObject {@see makeDraggable} is dragged outside the boundaries
  of a drop area. The dragCallback is called with the draggedObject reference as the only argument
  endCallback: fired when the draggedObject {@see makeDraggable} is dropped outside the boundaries
  of a drop area. The endCallback is called with the draggedObject reference as the only argument
makeDragArea(dragArea, dragCallback, endCallback)

---

Sets a given container as a drop area. When an object is dragged or dropped inside a drop area 
the corresponding moveCallback or dropCallback are fired.

dropArea: a flex container.
moveCallback: the callback fired when the draggedObject {@see makeDraggable} is dragged within the boundaries
  of a drop area. The moveCallback is called with the following aruments moveCallback(draggedObject, dropArea).
dropCallback: the callback fired when the draggedObject {@see makeDraggable} is dropped within the boundaries
  of a drop area. The dropCallback is called with the following aruments dropCallback(draggedObject, dropArea).
makeDropArea(dropArea, moveCallback, dropCallback)

---

This is an utility method used to determine whether a given point haveing coordinates {x, y}
in the drag area lies inside the given drop area.

isInsideDropArea({x, y, dropArea})
