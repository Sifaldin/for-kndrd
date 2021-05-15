import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { RiDoorOpenLine } from "react-icons/ri";
import Api from "../../api/Api";
import { Link } from "react-router-dom";
import Auth from "../../services/Auth";
import ImageEditMenu from "./ImageEditMenu";
import { RiDashboardLine } from "react-icons/ri";

export default function DropDownMenu({ user, setUser }) {
  const [open, setOpen] = useState(true);
  const [activeMenu, setactiveMenu] = useState("main");

  const [imgUrl, setImgUrl] = useState("");

  const [showImageEdit, setShowImageEdit] = useState(false);

  const showModalAndCloseMenu = () => {
    setShowImageEdit(true);
    setOpen(!open);
  };

  //Callback function that will send a user update call to the server
  const updateUser = () => {
    const img = { ...user, imageUrl: imgUrl };
    Api.put("/user", img).then((res) => setUser(res.data));
  };

   const onLogout = () => Auth.logout();

  function DisplayItem(props) {
    return (
      <Link to="/" className="menu-item">
        <span className="icon-botton">{props.leftIcon}</span>
        {props.children}
      </Link>
    );
  }

  return (
    <div>
      <div>
        {open ? (
          <div className="dropdown">
            <CSSTransition
              in={activeMenu === "main"}
              unmountOnExit
              timeout={500}
              classNames="menu-primary"
            >
              <div className="menu">
                <Link
                  className="link-display"
                  to="/"
                  onClick={showModalAndCloseMenu}
                >
                  <DisplayItem
                    leftIcon={
                      <img
                        src={user.imageUrl}
                        alt="profile-pic"
                        style={{
                          height: "35px",
                          width: "35px",
                          borderRadius: "20px",
                          marginRight: "5px",
                        }}
                      />
                    }
                  >
                    Edit Photo
                  </DisplayItem>
                </Link>

                <Link
                  className="link-display"
                  to="/"
                  onClick={() => setOpen(!open)}
                >
                  <DisplayItem leftIcon={<RiDashboardLine size="40px" />}>
                    Dashboard
                  </DisplayItem>
                </Link>

                
                <Link  to="" className="link-display" onClick={onLogout}>
                  <DisplayItem leftIcon={<RiDoorOpenLine size="40px" />}>
                    Log Out
                  </DisplayItem>
                </Link>

                
              </div>
            </CSSTransition>

          </div>
        ) : null}
      </div>
      <div>
        {showImageEdit ? (
          <ImageEditMenu
            user={user}
            setUser={setUser}
            setShowImageEdit={setShowImageEdit}
          />
        ) : null}
      </div>
    </div>
  );
}

