import React from "react";
import { Link } from "react-router-dom";
import { Hero } from "../components/globals/Hero";
import { Banner } from "../components/globals/Banner";
import { RoomContainer } from "../components/rooms/RoomContainer";
import { Cart } from "../components/Cart";
import Helmet from "react-helmet";

export const RoomsPage = () => {
  return (
    <>
      <Helmet>
        <title>Please take a look at our collection of rooms</title>
      </Helmet>
      <Hero type="roomsBg">
        <Cart />
        <Banner title="our rooms" desc="check out our available rooms">
          <Link to="/" className="btn-primary text-uppercase">
            return home
          </Link>
        </Banner>
      </Hero>

      <RoomContainer />
    </>
  );
};
