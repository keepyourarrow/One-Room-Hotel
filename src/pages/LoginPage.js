import React from "react";
import {Helmet} from "react-helmet"
import { LoginContent } from "../components/login/LoginContent";
import { Title } from "../components/globals/Title";

export const LoginPage = () => {
  return (
    <section className="login-section mt-5">
      <Helmet><title>Sign Up or Log In...</title></Helmet>
      <Title title="login" />
      <div className="container p-4">
        <LoginContent />
      </div>
    </section>
  );
};
