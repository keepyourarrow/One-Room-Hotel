import React from "react";
import { Hero } from "../components/globals/Hero";
import { Banner } from "../components/globals/Banner";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export const ErrorPage = () => {
  let [test, setTest] = React.useState([2, 3, 4]);
  return (
    <>
      <Helmet>
        <title>This page doesn't exist!</title>
      </Helmet>
      <Hero type="defaultBg">
        <Banner title="404" desc="room not found">
          <Link to="/" className="btn-primary text-uppercase">
            return home
          </Link>
        </Banner>
      </Hero>
    </>
  );
};
