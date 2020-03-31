import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RoomContext } from "../context";

export const Cart = () => {
  let { loggedInUser, setLoggedInUser, cartOpen } = useContext(RoomContext);
  console.log(loggedInUser);
  if (
    loggedInUser === null ||
    loggedInUser === undefined ||
    loggedInUser.length === 0
  ) {
    return <></>;
  }

  let { room } = loggedInUser[0];

  console.log(room);

  const handleClearRoom = () => {
    let temp = [...loggedInUser];
    let tempRoom = { ...temp[0] };
    tempRoom.room = [];
    temp[0] = tempRoom;
    console.log(temp[0].room.length === undefined);
    setLoggedInUser(temp);
  };

  return (
    <>
      {console.log(loggedInUser)}
      {loggedInUser && (
        <>
          <div className={cartOpen ? "cart-open cart" : "cart"}>
            {loggedInUser[0].room.length === 0 ? (
              // IF CART IS EMPTY
              <div className="cart-empty mx-auto">
                <h4 className="">Cart is Empty</h4>
                <Link to={`/rooms`} className="text-uppercase cart-view ">
                  View Rooms
                </Link>
              </div>
            ) : (
              // IF ITEM IS ADDED
              <>
                <div className="cart-item d-flex justify-content-between align-items-center">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="img-fluid"
                  />
                  <div className="cart-text text-center">
                    <h4 className="text-capitalize">
                      {loggedInUser[0].room.name}
                    </h4>
                  </div>
                  <span>${room.price} </span>
                </div>

                <div className="cart-buttons-container d-flex justify-content-around align-items-center mt-3 mx-auto">
                  <a
                    className="text-uppercase clear-cart"
                    onClick={handleClearRoom}
                  >
                    Clear
                  </a>
                  <Link
                    to={`/rooms/${room.slug}`}
                    className="text-uppercase cart-view"
                  >
                    View Room
                  </Link>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};
