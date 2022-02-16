import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./style.css";

function ChangeBackground(props) {
  const [show, setShow] = useState(false);
  const handleShow = (e) => {
    setShow(true);
  };
  const handleClose = () => setShow(false);
  const [background, setBackground] = useState(
    "https://phunugioi.com/wp-content/uploads/2020/02/background-dep-chat-luong-cao.jpg"
  );

  const handleChangeBackground = (e) => {
    setBackground(e.target.currentSrc);
    document.querySelector(".App").style.backgroundImage = `url(${background})`;
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
            <img
              className="change-background"
              alt="hinhnen"
              onClick={(e) => handleChangeBackground(e)}
              src="https://tophinhanhdep.com/wp-content/uploads/2021/10/1920X1080-HD-Beach-Desktop-Wallpapers.jpg"
            />
            <img
              className="change-background"
              alt="hinhnen"
              onClick={(e) => handleChangeBackground(e)}
              src="https://i.ytimg.com/vi/iA9WOk654kc/maxresdefault.jpg"
            />
            <img
              className="change-background"
              alt="hinhnen"
              onClick={(e) => handleChangeBackground(e)}
              src="https://wallpaperaccess.com/full/1356282.jpg"
            />
            <img
              className="change-background"
              alt="hinhnen"
              onClick={(e) => handleChangeBackground(e)}
              src="http://3.bp.blogspot.com/-xNHvv4ojNYU/UxLmhstnhLI/AAAAAAAAIQY/n8KRpyx5gz0/s1600/Dragon-Ball-SonGoku-Desktop-Wallpaper-full-HD-Infographic-BLOG-18.jpg"
            />
            <img
              className="change-background"
              alt="hinhnen"
              onClick={(e) => handleChangeBackground(e)}
              src="https://phunugioi.com/wp-content/uploads/2020/02/background-dep-chat-luong-cao.jpg"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ChangeBackground;
