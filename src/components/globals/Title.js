import React from "react";

export const Title = ({ title }) => {
  return (
    <div className="section-title text-center mt-2">
      <h3 className="text-capitalize">{title}</h3>
      <div className="title-line"></div>
    </div>
  );
};
