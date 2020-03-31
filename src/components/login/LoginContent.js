import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { RoomContext } from "../../context";

function processLogin(data, users, setLoggedInUser) {
  let tempUser = users.filter(
    (user) => user.name === data.name && user.password === data.password
  );
  console.log(tempUser);

  if (tempUser.length === 0) {
    return false;
  } else {
    setLoggedInUser(tempUser);
    return "Good";
  }
}
function registerUser(data, users, setUsers) {
  let tempUser = {
    name: data.name,
    email: data.email,
    password: data.password,
    admin: false,
    room: []
  };
  console.log(tempUser);

  setUsers([...users, tempUser]);
}

export const LoginContent = ({ modalState, modalDispatch }) => {
  const { users, setUsers, loggedInUser, setLoggedInUser } = useContext(
    RoomContext
  );
  const [loginSwitch, setLoginSwitch] = useState("login");
  const { register, handleSubmit, errors, setError } = useForm();
  const history = useHistory();

  const handleSwitch = (e) => {
    if (e.target.name === "signup") {
      setLoginSwitch("signup");
    } else {
      setLoginSwitch("login");
    }
  };

  const onSubmit = (data, e) => {
    let authStatus;

    if (loginSwitch === "signup") {
      registerUser(data, users, setUsers, setLoggedInUser);
      history.push("/");
      if (modalState) {
        modalDispatch("close");
      }
      setLoginSwitch("login");
      setTimeout(() => {
        alert("Signup successfull. Please log in");
      }, 100);
      e.target.reset();
      return;
    } else {
      authStatus = processLogin(data, users, setLoggedInUser);
    }
    console.log(authStatus);

    if (authStatus === "Good") {
      history.push("/");
      if (modalState) {
        modalDispatch("close");
        e.target.reset();
      }
    } else {
      setError("name", "notMatch", "Password or username is incorrect");
      return;
    }
    console.log(loggedInUser);
  };
  return (
    <div className="login-content">
      <div className="d-flex align-items-start">
        <a
          name="signup"
          href="#signup"
          className={
            (loginSwitch === "signup" ? "active " : "") + " mr-4 login-switches"
          }
          onClick={handleSwitch}
        >
          Sign Up
        </a>
        <a
          name="login"
          href="#login"
          className={
            (loginSwitch === "login" ? "active" : "") + " login-switches"
          }
          onClick={handleSwitch}
        >
          Log In
        </a>
      </div>
      <hr />

      <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
        <label htmlFor="name" className="login-label ">
          Username:
          <input
            type="text"
            name="name"
            id="name"
            className="mt-2"
            ref={register({
              required: { value: true, message: "This field is required" },
              minLength: { value: 5, message: "Min characters - 5" }
            })}
          />
          <span className="login-error">{errors?.name?.message}</span>
        </label>
        {loginSwitch === "signup" && (
          <label htmlFor="email" className="login-label mt-2">
            Email:
            <input
              type="email"
              name="email"
              id="email"
              className="mt-2"
              ref={register({
                required: { value: true, message: "This field is required" },
                pattern: {
                  value: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                  message: "Please enter a valid email"
                }
              })}
            />
            <span className="login-error">{errors?.email?.message}</span>
          </label>
        )}

        <label htmlFor="password" className="login-label mt-2 mb-4">
          Password:
          <input
            type="password"
            name="password"
            id="password"
            className="mt-2"
            ref={register({
              required: { value: true, message: "This field is required" },
              minLength: { value: 5, message: "Min characters - 5" }
            })}
          />
          <span className="login-error">{errors?.password?.message}</span>
        </label>
        <button type="submit">
          {loginSwitch === "login" ? "Log In" : "Sign Up"}
        </button>
      </form>
    </div>
  );
};
