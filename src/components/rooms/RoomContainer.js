import React, { useContext, useReducer, useState, useEffect } from "react";
import { RoomContext } from "../../context";
import { RoomList } from "./RoomList";
import { RoomSearch } from "./RoomSearch";

let initialState = {
  allRoomType: [],
  allRoomGuests: [],
  maxPrice: 0,
  minSize: 0,
  maxSize: 0,
  totalMaxSize: 0,
  totalMinSize: 0,
  type: "all",
  guests: 1,
  price: 0,
  breakfast: false,
  pets: false
};

function reducer(state, { field, value }) {
  return {
    ...state,
    [field]: value
  };
}

function getUniqueValues(rooms, type) {
  let tempValue = new Set(rooms.map((room) => room[type]));
  return [...tempValue]; // convert Set to array
}

function init(rooms, state) {
  state.allRoomType = getUniqueValues(rooms, "type");
  state.allRoomGuests = getUniqueValues(rooms, "capacity");
  state.maxPrice = Math.max(...rooms.map((room) => room.price));
  state.price = state.maxPrice;
  state.minSize = Math.min(...rooms.map((room) => room.size));
  state.totalMinSize = state.minSize;
  state.maxSize = Math.max(...rooms.map((room) => room.size));
  state.totalMaxSize = state.maxSize;
}

function filterRooms(searchState, rooms, setSortedRooms) {
  let tempRoom = [...rooms];

  //filtering by type
  if (searchState.type !== "all") {
    tempRoom = tempRoom.filter((room) => room.type === searchState.type);
  }
  // filtering by capacity
  tempRoom = tempRoom.filter((room) => room.capacity >= searchState.guests);

  //filtering by price
  tempRoom = tempRoom.filter((room) => room.price <= searchState.price);

  //filtering by size
  tempRoom = tempRoom.filter(
    (room) =>
      room.size >= searchState.minSize && room.size <= searchState.maxSize
  );
  //filtering by breakfast
  if (searchState.breakfast) {
    tempRoom = tempRoom.filter((room) => room.breakfast === true);
  }
  //filtering by pets
  if (searchState.pets) {
    tempRoom = tempRoom.filter((room) => room.pets === true);
  }

  setSortedRooms(tempRoom);
}

export const RoomContainer = () => {
  let { loading, rooms } = useContext(RoomContext);
  let [sortedRooms, setSortedRooms] = useState([]);
  let [searchState, searchDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (rooms === null) {
      return;
    }
    setSortedRooms(rooms);
    init(rooms, searchState);
  }, [rooms]);

  useEffect(() => {
    if (rooms === null) {
      return;
    }
    filterRooms(searchState, rooms, setSortedRooms);
  }, [searchState]);

  if (rooms === null) {
    return (
      <div className="container-fluid p-5 mt-5">
        <h3 className="text-capitalize text-center">
          unfortunately no rooms are available
        </h3>
      </div>
    );
  }

  const handleChange = (e) => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    if (
      e.target.name === "guests" ||
      e.target.name === "price" ||
      e.target.name === "minSize" ||
      e.target.name === "maxSize"
    ) {
      value = +value;
    }
    searchDispatch({ field: e.target.name, value: value });
  };

  return (
    <>
      <RoomSearch searchState={searchState} handleChange={handleChange} />
      <RoomList sortedRooms={sortedRooms} loading={loading} />
    </>
  );
};
