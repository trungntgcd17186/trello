import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "./style.css";

function ChangeBackground(props) {
  const [show, setShow] = useState(false);

  const backgroundStorage = localStorage.getItem("myBackground");
  const [background, setBackground] = useState(
    backgroundStorage ||
      "https://tophinhanhdep.com/wp-content/uploads/2021/10/1920X1080-HD-Beach-Desktop-Wallpapers.jpg"
  );

  useEffect(() => {
    document.querySelector(".App").style.backgroundImage = `url(${background})`;
  }, []);

  //Xử lý thay đổi hình nền app.
  const handleChangeBackground = (e) => {
    setBackground(e.target.currentSrc);
    document.querySelector(".App").style.backgroundImage = `url(${background})`;
  };

  //Show Modal
  const handleShow = (e) => {
    setShow(true);
  };
  //Close Modal, Xử lý set lại hình ảnh cũ (lưu ở localStorage) khi bấm nút Close.
  const handleClose = () => {
    setShow(false);
    document.querySelector(
      ".App"
    ).style.backgroundImage = `url(${backgroundStorage})`;
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
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ChangeBackground;
