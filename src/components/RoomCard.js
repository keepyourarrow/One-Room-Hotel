import React, { useState, useEffect, useContext } from "react";
import { RoomContext } from "../context";
import { Link } from "react-router-dom";

const display = (setDisplayMessage, setOrderClicked, text) => {
  setOrderClicked(true);
  setDisplayMessage(text);
  setTimeout(() => setOrderClicked(false), 4000);
};

export const RoomCard = ({ room, col }) => {
  let [isClicked, setIsClicked] = useState(false);
  let [orderClicked, setOrderClicked] = useState(false);
  let [displayMessage, setDisplayMessage] = useState("");
  let [orderStatus, setOrderStatus] = useState("");
  let {
    loggedInUser,
    setLoggedInUser,
    rooms,
    setRooms,
    setFeaturedRooms
  } = useContext(RoomContext);

  useEffect(() => {
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape") {
        setIsClicked(false);
      }
    });
  }, []);

  useEffect(() => {
    setFeaturedRooms(rooms.filter((room) => room.featured));
  }, [rooms]);

  const handleClick = () => {
    if (isClicked) {
      setIsClicked(false);
      document.body.style.overflow = "auto";
    } else {
      setIsClicked(true);
      document.body.style.overflow = "hidden";
    }
  };

  const handleSubmit = () => {
    //Room is ordered only if the user is logged in.
    if (loggedInUser.length > 0) {
      // if user didn't order the room
      console.log(loggedInUser[0].room.length !== undefined);
      console.log(loggedInUser[0].room.length !== 0);
      if (loggedInUser[0].room.length == 0) {
        let temp = [...loggedInUser]; // made a copy of user
        let tempRoom = { ...temp[0] }; // made a copy of an item
        tempRoom.room = room; // replaced the property room
        temp[0] = tempRoom; // put it back to temp
        setLoggedInUser(temp);
        setOrderStatus("Success");
        display(
          setDisplayMessage,
          setOrderClicked,
          "Room has been succesfully added"
        );
      } else if (loggedInUser[0].room.length !== 0) {
        setOrderStatus("Error");
        display(
          setDisplayMessage,
          setOrderClicked,
          "You already ordered a room"
        );
      }
    } else {
      setOrderStatus("Error");
      display(setDisplayMessage, setOrderClicked, "Please login");
    }
  };

  const handleDelete = () => {
    console.log(rooms);
    let tempRoom = rooms.filter((key) => room !== key);
    setRooms(tempRoom);
  };
  return (
    <article className={col}>
      <div className={(isClicked ? "hide" : "") + " card text-capitalize"}>
        <div className="img-container">
          <div className="card-price">
            <h6>${room.price}</h6>
            <p>per night</p>
          </div>
          {loggedInUser !== null &&
            loggedInUser.length > 0 &&
            loggedInUser[0].admin && (
              <div className="card-delete" onClick={handleDelete}>
                <i className="fa fa-shopping-cart"></i>
              </div>
            )}
          <img
            className="card-img-top img-fluid"
            src={room.images[0]}
            alt={room.name}
          />
          <Link
            to={`/rooms/${room.slug}`}
            className="btn-primary text-uppercase card-btn"
          >
            Features
          </Link>
        </div>
        <div className="card-body">
          <h4>{room.name}</h4>
        </div>
        <div className="card-footer">
          <button onClick={handleClick}> Order</button>
        </div>
      </div>

      {/* Modal */}
      <div
        className={(isClicked ? "visible" : "") + " modalRoot"}
        onClick={handleClick}
      >
        {/* DISPLAY MESSAGE */}
        {orderClicked && (
          <div
            className={
              orderStatus === "Success"
                ? "create-room-success room-order-success"
                : "room-order-error"
            }
          >
            {displayMessage}
          </div>
        )}
        <div
          className="container-fluid room-card-modal-content"
          onClick={(e) => {
            e.stopPropagation();
            return false;
          }}
        >
          <div className="row text-left">
            <div className="col-12 mb-3 modal-img-container">
              <img
                src={room.images[0]}
                className="img-fluid main-img"
                alt={room.name}
              />
              <Link
                to={`/rooms/${room.slug}`}
                className="btn-primary text-uppercase btn-card-modal"
                onClick={handleClick}
              >
                View Full Page
              </Link>
            </div>
            {room.images.map((room, index) => (
              <div className="col-3 mt-3 mb-3" key={index}>
                <img src={room} alt={room.name} className="img-fluid" />
              </div>
            ))}
            <div className="room-text">
              <h6 className="col-12">
                price: <span>${room.price}</span>
              </h6>
              <h6 className="col-12">
                size: <span>{room.size} SQFT</span>
              </h6>
              <h6 className="col-12">
                max Capacity:
                <span>
                  {room.capacity > 1
                    ? `${room.capacity} people`
                    : `${room.capacity} person`}
                </span>
              </h6>
              <h6 className="col-12">
                {room.pets ? "pets allowed" : "No Pets allowed"}
              </h6>
              <h6 className="col-12">
                {room.breakfast && "free breakfast included"}
              </h6>
            </div>
            <div className="col-12 mb-3 ">
              <button
                className="mx-auto"
                onClick={handleSubmit}
                disabled={orderClicked ? true : false}
              >
                I want It Now
              </button>
            </div>
          </div>
        </div>
        {/* End of Modal */}
      </div>
    </article>
  );
};

//default bootstrap col. I want this as default, but since i'm reusing this component
// and want to display col differently, i'll pass it down as props.
RoomCard.defaultProps = {
  col: "col-xl-4 col-lg-6 col-sm-6 col-10 mb-5"
};
