import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

function UpdateTodos(props) {
  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details Todos</Modal.Title>
        </Modal.Header>
        <form
          action=""
          id="form-payment"
          onSubmit={props.handleSubmit(props.onOrderSubmit, props.onError)}
        >
          <Modal.Body>
            <div>
              <label>Title:</label>
              <input
                type="text"
                className="form-control"
                {...props.register("title")}
              />
              {props.errors.title && (
                <p className="errors">{props.errors.title.message}</p>
              )}
            </div>
            <div className="status">
              <label>Status:</label>
              <select {...props.register("completed")}>
                <option value={false}>Incomplete</option>
                <option value={true}>Completed</option>
              </select>
            </div>
            <div>
              <label>Assignee:</label>
              <select {...props.register("assignee")}>
                {props.dataUsers?.map((data, index) => (
                  <option key={index} value={data.name}>
                    {data.name}
                  </option>
                ))}
              </select>
              {props.errors.assignee && (
                <p className="errors">{props.errors.assignee.message}</p>
              )}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={props.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default UpdateTodos;
