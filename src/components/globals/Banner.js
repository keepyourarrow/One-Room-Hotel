import React from "react";

export const Banner = ({ children, title, desc }) => {
  let price = title === "Luxurious Rooms" ? "$299" : "";
  return (
    <div className="banner-container">
      <h1 className="text-capitalize">{title}</h1>
      <div></div>
      <p className="text-capitalize">
        {desc} <span>{price}</span>
      </p>
      {children}
    </div>
  );
};
