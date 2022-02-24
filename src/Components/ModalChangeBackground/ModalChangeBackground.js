import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./style.css";
import { srcImgData, defaultSrcImg } from "../../Constants";

function ModalChangeBackground(props) {
  const { setBackground, background, backgroundStorage } = props;
  const [show, setShow] = useState(false);

  //Xử lý thay đổi hình nền app.
  const handleChangeBackground = (e) => {
    setBackground(e.target.currentSrc);
  };

  //Show Modal
  const handleShow = (e) => {
    setShow(true);
  };
  //Close Modal, Xử lý set lại hình ảnh cũ (lưu ở localStorage) khi bấm nút Close.
  const handleClose = () => {
    setShow(false);
    setBackground(backgroundStorage || defaultSrcImg);
  };

  //Lưu localStorage khi bấm nút Save.
  const handleSave = () => {
    setShow(false);
    localStorage.setItem("myBackground", background);
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Change Background
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Double tap to change the background</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="img-container">
            {srcImgData.map((data, index) => (
              <img
                key={index}
                className="change-background"
                alt="hinhnen"
                onClick={(e) => handleChangeBackground(e)}
                src={data}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalChangeBackground;
