import React, { useContext, useState } from "react";
import { RoomContext } from "../../context";

export const PleaseLoginAlert = () => {
  const { loggedInUser } = useContext(RoomContext);
  const [closeLoginAlert, setCloseLoginAlert] = useState(false);
  let loginStatus =
    loggedInUser && loggedInUser.length > 0 ? "Logout" : "Login/Signin";

  return (
    <div>
      {loginStatus === "Login/Signin" ? (
        <div
          className={
            closeLoginAlert ? "please-login-alert-off" : "please-login-alert-on"
          }
        >
          Login To Order A Room!(normaluser normaluser. Or admin admin for
          admin)
          <span
            className="please-login-alert-close"
            onClick={() => setCloseLoginAlert(true)}
          >
            x
          </span>
        </div>
      ) : (
        <div
          className={
            loginStatus === "Logout"
              ? "please-login-alert-off"
              : "please-login-alert-on"
          }
        ></div>
      )}
    </div>
  );
};
