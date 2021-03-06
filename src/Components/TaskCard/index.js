import React from "react";
import { Draggable } from "react-beautiful-dnd";

function TaskCard({ item, index, handleShow }) {
  return (
    <Draggable key={item.id} draggableId={item.id + ""} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className="task-information"
            id={item.id}
            onClick={(e) => handleShow(e.target)}
          >
            <p id={item.id} onClick={(e) => handleShow(e.target)}>
              {item.title}
            </p>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default TaskCard;
