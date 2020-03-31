import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const NoRoomFound = () => {
  return (
    <StyledBody>
      <div className="container p-5 error">
        <div className="row mx-auto d-block text-center">
          <h3 className="text-capitalize">no such room could be found</h3>
          <Link to="/rooms" className="btn-primary text-uppercase">
            back to rooms
          </Link>
        </div>
      </div>
    </StyledBody>
  );
};

// styled component
const StyledBody = styled.body`
  background-color: #edeff0;
  height: calc(100vh - 81px);
`;
