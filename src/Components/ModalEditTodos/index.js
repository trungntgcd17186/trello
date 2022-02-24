import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./style.css";

function ModalEditTodos(props) {
  const {
    show,
    onOrderSubmit,
    handleSubmit,
    onError,
    errors,
    handleClose,
    dataUsers,
    register,
  } = props;

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Details Todos</Modal.Title>
        </Modal.Header>
        <form
          action=""
          id="form-payment"
          onSubmit={handleSubmit(onOrderSubmit, onError)}
        >
          <Modal.Body>
            <div>
              <label>Title:</label>
              <input type="text" className="select" {...register("title")} />
              {errors.title && <p className="errors">{errors.title.message}</p>}
            </div>
            <div className="status">
              <label>Status:</label>
              <select className="select" {...register("completed")}>
                <option value={false}>Incomplete</option>
                <option value={true}>Completed</option>
              </select>
            </div>
            <div className="SelectOption">
              <label>Assignee:</label>
              <select className="select" {...register("assignee")}>
                {dataUsers?.map((data, index) => (
                  <option key={index} value={data.name}>
                    {data.name}
                  </option>
                ))}
              </select>
              {errors.assignee && (
                <p className="errors">{errors.assignee.message}</p>
              )}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  );
}

export default ModalEditTodos;
