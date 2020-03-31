import React from "react";
import { RoomCard } from "../RoomCard";

export const RoomList = ({ sortedRooms }) => {
  if (sortedRooms.length === 0) {
    return (
      <div className="container-fluid p-5">
        <h3 className="text-capitalize text-center">
          unfortunately no rooms matched your search parameters
        </h3>
      </div>
    );
  }
  sortedRooms = sortedRooms.map((room) => {
    return (
      <RoomCard
        key={room.id}
        room={room}
        col="col-xl-3 col-lg-4 col-md-6 col-10  mb-5"
      />
    );
  });
  return (
    <section id="room-list" className="room-list room-cards">
      <div className="container-fluid">
        <div className="row mt-1 pt-1 text-center">{sortedRooms}</div>
      </div>
    </section>
  );
};
