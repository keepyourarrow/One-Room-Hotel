import React, { useState, useContext, useReducer, useEffect } from "react";
import logo from "../../img/logo.png";
import { Link } from "react-router-dom";
import { LoginModal } from "../login/LoginModal";
import { RoomContext } from "../../context";
import { PleaseLoginAlert } from "./PleaseLoginAlert";

let initialState = {
  openModal: false,
};

function reducer(state, action) {
  switch (action) {
    case "open":
      document.body.style.overflow = "hidden";
      state = {
        openModal: true,
      };
      return state;
    case "close":
      document.body.style.overflow = "auto";
      state = {
        openModal: false,
      };
      return state;

    default:
      return state;
  }
}

//NOTE if the list gets too big, consider using map function to map over them rather than hardcoding
export const Navbar = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [restoreModal, setRestoreModal] = useState(false);
  const [mobileScreen, setMobileScreen] = useState(false);
  const [modalState, modalDispatch] = useReducer(reducer, initialState);
  const {
    loggedInUser,
    setLoggedInUser,
    cartOpen,
    setCartOpen,
    restoreToNormal,
  } = useContext(RoomContext);
  let loginStatus =
    loggedInUser && loggedInUser.length > 0 ? "Logout" : "Login/Signin";

  useEffect(() => {
    window.addEventListener("resize", function () {
      if (window.innerWidth < 560) {
        setMobileScreen(true);
      } else {
        setMobileScreen(false);
      }
    });
  }, []);

  const handleToggle = () => {
    setIsClicked(!isClicked);
  };

  const handleCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <nav className="navbar navbar-expand-lg ">
      <PleaseLoginAlert />
      <Link to="/" className="navbar-brand">
        <img src={logo} alt="logo" />
      </Link>
      <button
        aria-expanded="false"
        className={(isClicked ? "change" : "") + " navbar-toggler"}
        type="button"
        onClick={handleToggle}
      >
        <div className="toggler-btn">
          <div className="bar bar1"></div>
          <div className="bar bar2"></div>
          <div className="bar bar3"></div>
        </div>
      </button>

      <ul
        className={
          (isClicked ? "nav-links show-nav" : "nav-links") +
          " navbar-nav mr-auto ml-5 navbar-collapse"
        }
      >
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item ml-3">
          <Link to="/rooms" className="nav-link">
            Rooms
          </Link>
        </li>

        {loggedInUser === null && (
          <li className="nav-item ml-3">
            <a onClick={restoreToNormal} className="nav-link restore-link">
              Populate Data
            </a>
          </li>
        )}
        {/* display only if user is admin */}
        {loginStatus === "Logout" && loggedInUser[0].admin && (
          <>
            <li className="nav-item ml-3">
              <Link to="/create-new-room" className="nav-link">
                Create-room
              </Link>
            </li>
            <li className="nav-item ml-3" onClick={() => setRestoreModal(true)}>
              <a onClick={restoreToNormal} className="nav-link restore-link">
                Restore
              </a>
            </li>
          </>
        )}
        <div
          className={(restoreModal ? "visible" : "") + " modalRoot"}
          onClick={() => setRestoreModal(false)}
        >
          <div className="restore-modal">Restored to normal...</div>
        </div>
        {/* If user is logged in, display Logout message and  */}
        {loginStatus === "Logout" ? (
          <li className="nav-item ml-auto pr-3">
            <a
              href="#"
              onClick={() => setLoggedInUser([])}
              className="nav-link"
            >
              Logout
            </a>
          </li>
        ) : (
          <li className="nav-item ml-auto pr-3">
            {mobileScreen ? (
              <Link to="/login" className="nav-link">
                Login/Signin
              </Link>
            ) : (
              <>
                <a
                  href="#"
                  onClick={() => modalDispatch("open")}
                  className="nav-link"
                >
                  Login/Signin
                </a>
                <LoginModal
                  modalState={modalState}
                  modalDispatch={modalDispatch}
                />
              </>
            )}
          </li>
        )}
      </ul>

      {/* user circle */}
      {loginStatus === "Logout" && (
        <div className="nav-user-container" onClick={handleCart}>
          <div className="nav-user">
            <div>{loggedInUser[0].name[0].toUpperCase()}</div>
            {loggedInUser[0].room.length !== 0 && <span>1</span>}
            {/* {cartNumber} */}
          </div>
        </div>
      )}
    </nav>
  );
};
