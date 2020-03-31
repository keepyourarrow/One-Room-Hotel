import React, { useEffect } from "react";
import { LoginContent } from "./LoginContent";

export const LoginModal = ({ modalState, modalDispatch }) => {
  useEffect(() => {
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape") {
        modalDispatch("close");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={(modalState.openModal ? "visible" : "") + " modalRoot"}
      onClick={() => {
        !modalState.openModal ? modalDispatch("open") : modalDispatch("close");
      }}
    >
      <div className="container modal">
        <div
          className="login-box"
          onClick={(e) => {
            e.stopPropagation();
            return false;
          }}
        >
          <span onClick={() => modalDispatch("close")} className="login-box-x">
            x
          </span>
          <LoginContent modalState={modalState} modalDispatch={modalDispatch} />
        </div>
      </div>
    </div>
  );
};
