import React, { useEffect, useContext } from "react";
import { RoomContext } from "../context";
import { NoRoomFound } from "../components/NoRoomFound";
import { DisplaySingleRoom } from "../components/DisplaySingleRoom";
import Helmet from "react-helmet";

export const SingleRoomPage = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  let { getRoom } = useContext(RoomContext);
  let room = getRoom(props.match.params.slug);

  if (!room) {
    return <NoRoomFound />;
  }

  return (
    <div>
      <Helmet>
        <title>Welcome to {room.name}</title>
      </Helmet>
      <DisplaySingleRoom room={room} />
    </div>
  );
};
