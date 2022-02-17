import React from "react";
import { Draggable } from "react-beautiful-dnd";
import LazyLoad from "react-lazyload";

function TaskCard({ item, index, handleShow }) {
  const Loading = () => (
    <div className="post loading">
      <h5>Loading...</h5>
    </div>
  );
  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
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
