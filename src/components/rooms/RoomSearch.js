import React from "react";
import { Title } from "../globals/Title";

export const RoomSearch = ({ searchState, handleChange }) => {
  let {
    allRoomType,
    allRoomGuests,
    maxPrice,
    minSize,
    maxSize,
    totalMinSize,
    totalMaxSize,
    price,
    breakfast,
    pets
  } = searchState;

  // to jsx
  allRoomType = allRoomType.map((type, index) => {
    return (
      <option value={type} key={index}>
        {type}
      </option>
    );
  });
  // to jsx
  allRoomGuests = allRoomGuests.map((type, index) => {
    return (
      <option value={type} key={index}>
        {type}
      </option>
    );
  });

  return (
    <section className="search">
      <Title title="Search" />
      <div className="container-fluid my-5 pt-2">
        <div className="row">
          {/* Room type */}
          <div className="col-lg-2  col-sm-6 col-10 mx-auto mr-3">
            <label htmlFor="type" className="search-label">
              Room Type
              <select
                id="type"
                name="type"
                className="search-input mt-2"
                onChange={handleChange}
              >
                <option value="all">All</option>
                {allRoomType}
              </select>
            </label>
          </div>

          {/* Guests: */}
          <div className="col-lg-2  col-sm-6 col-10 mx-auto mr-4">
            <label htmlFor="guests" className="search-label">
              Guests
              <select
                id="guests"
                name="guests"
                className="search-input mt-2"
                onChange={handleChange}
              >
                {allRoomGuests}
              </select>
            </label>
          </div>

          {/* Room Price */}
          <div className="col-lg-2  col-sm-6 col-10 mx-auto mr-3 range">
            <label htmlFor="price" className="search-label">
              Room Price ${price}
              <input
                type="range"
                id="price"
                name="price"
                min={0}
                max={maxPrice}
                value={price}
                className="search-input mt-2"
                onChange={handleChange}
              />
            </label>
          </div>

          {/* Room Size */}
          <div className="col-lg-3  col-sm-6 col-10 mx-auto mr-4">
            <label className="search-label">
              Room Size(sqft)
              <div className="d-flex">
                <input
                  type="number"
                  id="minSize"
                  name="minSize"
                  min={totalMinSize}
                  max={totalMaxSize}
                  value={minSize}
                  className="search-input mt-2 mr-2"
                  onChange={handleChange}
                />
                <input
                  type="number"
                  id="maxSize"
                  name="maxSize"
                  min={totalMinSize}
                  max={totalMaxSize}
                  value={maxSize}
                  className="search-input mt-2 mr-2"
                  onChange={handleChange}
                />
              </div>
            </label>
          </div>

          {/* checkboxes */}
          <div className="col-lg-2 col-sm-12 col-10 mx-auto">
            <div className="checkbox-container">
              <label htmlFor="breakfast" className="search-label">
                Breakfast
              </label>
              <input
                type="checkbox"
                name="breakfast"
                id="breakfast"
                value={breakfast}
                onChange={handleChange}
              />
              <label htmlFor="pets" className="search-label">
                Pets
              </label>
              <input
                type="checkbox"
                name="pets"
                id="pets"
                value={pets}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
