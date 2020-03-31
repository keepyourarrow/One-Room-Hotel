import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Hero } from "../components/globals/Hero";
import { Banner } from "../components/globals/Banner";
import { Services } from "../components/Services";
import { FeaturedRooms } from "../components/FeaturedRooms";
import { Cart } from "../components/Cart";

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>One Room - Order Your Hotel Room Now!!</title>
      </Helmet>
      <Hero type="defaultBg">
        <Cart />

        <Banner title="Luxurious Rooms" desc="Deluxe rooms starting at">
          <Link to="/rooms" className="btn-primary text-uppercase">
            our Rooms
          </Link>
        </Banner>
      </Hero>
      <Services />
      <FeaturedRooms />
    </>
  );
};
