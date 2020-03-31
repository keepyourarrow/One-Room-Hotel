import React, { useContext } from "react";
import { RoomContext } from "../context";
import { Title } from "./globals/Title";
import { RoomCard } from "./RoomCard";

export const FeaturedRooms = () => {
  let { featuredRooms } = useContext(RoomContext);

  if (featuredRooms === null || featuredRooms.length === 0) {
    return (
      <div className="container-fluid p-5 mt-5">
        <h3 className="text-capitalize text-center">
          unfortunately no rooms are available
        </h3>
      </div>
    );
  }

  featuredRooms = featuredRooms.map((room) => {
    return <RoomCard key={room.id} room={room} />;
  });
  return (
    <section className="featured room-cards">
      <div className="container-fluid">
        <Title title="Featured Rooms" />
        <div className="row mt-5 pt-3 text-center">{featuredRooms}</div>
      </div>
    </section>
  );
};
