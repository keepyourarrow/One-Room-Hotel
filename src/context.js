import React, { useState, createContext, useEffect } from "react";
import items from "./data";
const RoomContext = createContext();

const defaultUsernames = [
  {
    name: "admin",
    email: "admin@gmail.com",
    password: "admin",
    admin: true,
    room: []
  },
  {
    name: "normaluser",
    email: "normaluser@gmail.com",
    password: "normaluser",
    admin: false,
    room: []
  }
];

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState(JSON.parse(localStorage.getItem("rooms")));
  const [featuredRooms, setFeaturedRooms] = useState(
    JSON.parse(localStorage.getItem("featured"))
  );
  const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users")));
  const [cartOpen, setCartOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  //Getting data
  useEffect(() => {}, []);

  // Writing to local storage. User logged in
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  // list of users
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("rooms", JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem("featured", JSON.stringify(featuredRooms));
  }, [featuredRooms]);

  const formatData = () => {
    let tempItems = items.map((item) => {
      let id = item.sys.id;
      let images = item.fields.images.map((image) => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  };

  const restoreToNormal = () => {
    let rooms = formatData();
    setRooms(rooms);
    setFeaturedRooms(rooms.filter((room) => room.featured)); // featured = true => return
    setUsers(defaultUsernames);
    setLoggedInUser([]);
  };

  console.log(rooms);

  // find room by slug
  const getRoom = (slug) => {
    const room = rooms.find((room) => room.slug === slug);
    return room;
  };
  return (
    <RoomContext.Provider
      value={{
        rooms,
        featuredRooms,
        getRoom,
        setRooms,
        setFeaturedRooms,
        users,
        setUsers,
        loggedInUser,
        setLoggedInUser,
        cartOpen,
        setCartOpen,
        restoreToNormal
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
export { RoomProvider, RoomContext };
