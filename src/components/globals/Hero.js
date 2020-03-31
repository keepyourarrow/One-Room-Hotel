import React from "react";

export const Hero = ({ children, type }) => {
  return <header className={type}>{children}</header>;
};
