import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import defaultImg from "../img/defaultBg2.jpg";
import { Title } from "./globals/Title";
import { RoomContext } from "../context";

let inputNumbers = [
  {
    name: "price",
    title: "Price($):",
    placeholder: "Min:100, Max:600...",
    min: 10,
    max: 600,
    errorMin: "Min val needed - 100",
    errorMax: "Max val needed - 600"
  },
  {
    name: "size",
    title: "Size:",
    placeholder: "in SQFT. Min:10, Max:10000...",
    min: 10,
    max: 10000,
    errorMin: "Min val. needed - 10",
    errorMax: "Max value is - 10000"
  },
  {
    name: "capacity",
    title: "Capacity:",
    placeholder: "Number of people. Min:1,Max:10",
    min: 1,
    max: 10,
    errorMin: "Min val. needed - 1",
    errorMax: "Max val. needed - 10"
  }
];
let inputYesOrNo = [
  { name: "pets", title: "Pets:" },
  { name: "breakfast", title: "Breakfast:" },
  { name: "featured", title: "Featured:" }
];
function formatForm(e, rooms) {
  e.pets = e.pets.toUpperCase() === "YES" ? true : false;
  e.featured = e.featured.toUpperCase() === "YES" ? true : false;
  e.breakfast = e.breakfast.toUpperCase() === "YES" ? true : false;
  e.price = +e.price;
  e.size = +e.size;
  e.capacity = +e.capacity;

  // adding default description
  if (!e.description) {
    e.description =
      "Street art edison bulb gluten-free, tofu try-hard lumbersexual brooklyn tattooed pickled chambray." +
      " Actually humblebrag next level, deep v art party wolf tofu direct trade readymade sustainable hell of banjo." +
      "Organic authentic subway tile cliche palo santo, street art XOXO dreamcatcher retro sriracha portland air plant" +
      "kitsch stumptown. Austin small batch squid gastropub. Pabst pug tumblr gochujang offal retro cloud bread bushwick" +
      "semiotics before they sold out sartorial literally mlkshk. Vaporware hashtag vice, sartorial before they sold out pok pok health goth trust fund cray.";
  }

  //Adding default images
  let otherImages = rooms[0].images.map((key, index) => {
    if (index !== 0) {
      return key;
    }
  });
  otherImages[0] = defaultImg;

  // setting up id
  let id = rooms.length + 1;
  e.id = id.toString();

  //adding extras
  let extras = rooms[0].extras.map((key) => key);
  e.extras = extras;

  //settign up slug
  let slug = e.roomName
    .toLowerCase()
    .replace(/&/g, "-and-")
    .replace(/[\s\W-]+/g, "-");
  e.slug = slug;

  return {
    name: e.roomName,
    slug: e.slug,
    type: e.type,
    price: e.price,
    size: e.size,
    capacity: e.capacity,
    pets: e.pets,
    breakfast: e.breakfast,
    featured: e.featured,
    description: e.description,
    extras: e.extras,
    images: otherImages,
    id: e.id
  };
}
function identicalName(data, rooms) {
  let checkName = rooms.filter((room) => data.name === room.name);

  return checkName.length > 0 ? true : false;
}
export const CreateRoom = () => {
  let { rooms, setRooms, setFeaturedRooms, loggedInUser } = useContext(
    RoomContext
  );
  const { register, handleSubmit, errors, setError } = useForm();
  let [formSubmitted, setFormSubmitted] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setFeaturedRooms(rooms.filter((room) => room.featured));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rooms]);

  // if user is not logged in or is not an admin - kick him out.
  useEffect(() => {
    if (loggedInUser.length === 0) {
      history.push("/");
    }
    if (loggedInUser.length > 0) {
      if (!loggedInUser[0].admin) {
        history.push("/");
      }
    }
  }, []);

  const onSubmit = (data, e) => {
    let checkName = identicalName(data, rooms);
    if (checkName) {
      setError("name", "notMatch", "Name already exists");
      return;
    }

    let newObj = formatForm(data, rooms);
    setRooms([...rooms, newObj]);
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 4000);
    e.target.reset();
  };

  // If user is not logged in
  if (loggedInUser.length > 0) {
    // if user is not admi
    if (!loggedInUser[0].admin) {
    }
  }

  return (
    <section id="create-room" className="create-room mt-5">
      <Title title="Create new room" />
      {formSubmitted && (
        <div className="create-room-success">
          You've successfully created the room
        </div>
      )}
      <div className="container p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* name */}
          <div className="input-group input-group-sm mb-4 mx-auto">
            <label
              htmlFor="roomName"
              className="mr-2"
              data-toggle="tooltip"
              data-placement="top"
              title="EXAMPLE - Single economy"
            >
              Name:
            </label>
            <input
              type="text"
              name="roomName"
              id="roomName"
              className="form-control col-7"
              placeholder="Ex: single economy"
              ref={register({
                required: { value: true, message: "This field is required" },
                minLength: { value: 5, message: "Min characters - 5" }
              })}
            />
          </div>
          {/* name error message */}
          <p
            className={
              errors?.roomName
                ? "d-flex justify-content-center create-room-error-container"
                : ""
            }
          >
            <span className={errors?.roomName ? "create-room-error" : ""}>
              {errors?.roomName?.message}
            </span>
          </p>
          {/* type */}
          <div className="input-group mb-4 mx-auto">
            <label className="mr-2 mt-1" htmlFor="type">
              Type:
            </label>
            <select
              className="custom-select col-7 "
              name="type"
              id="type"
              ref={register}
            >
              <option value="single">single</option>
              <option value="double">double</option>
              <option value="family">family</option>
              <option value="presidential">presidential</option>
            </select>
          </div>
          {/* input of numbers (3 total) */}
          {inputNumbers.map((key, index) => {
            return (
              <div key={index}>
                <div className="input-group mb-4 mx-auto">
                  <label
                    htmlFor={key.name}
                    className="mr-2 mt-1"
                    data-toggle="tooltip"
                    data-placement="top"
                    title={`Min:${key.min} Max:${key.max}`}
                  >
                    {key.title}
                  </label>
                  <input
                    type="number"
                    name={key.name}
                    id={key.name}
                    className="form-control col-7"
                    placeholder={key.placeholder}
                    ref={register({
                      required: {
                        value: true,
                        message: "This field is required"
                      },
                      min: { value: key.min, message: key.errorMin },
                      max: { value: key.max, message: key.errorMax }
                    })}
                  />
                </div>
                <p
                  className={
                    errors[key.name]
                      ? "d-flex justify-content-center create-room-error-container"
                      : ""
                  }
                >
                  <span className={errors[key.name] ? "create-room-error" : ""}>
                    {errors[key.name]?.message}
                  </span>
                </p>
              </div>
            );
          })}
          {/* input of yes or no questions (3 total)*/}
          {inputYesOrNo.map((key, index) => {
            return (
              <div key={index}>
                <div className="input-group mb-4 mx-auto">
                  <label
                    htmlFor={key.name}
                    className="mr-2 mt-1"
                    data-toggle="tooltip"
                    data-placement="top"
                    title={`Yes or No`}
                  >
                    {key.title}
                  </label>
                  <input
                    type="text"
                    name={key.name}
                    id={key.name}
                    className="form-control col-7"
                    placeholder="Yes/No"
                    ref={register({
                      required: {
                        value: true,
                        message: "This field is required"
                      },
                      pattern: {
                        value: /^yes$|^no$/i,
                        message: "Type only Yes or No"
                      }
                    })}
                  />
                </div>
                <p
                  className={
                    errors[key.name]
                      ? "d-flex justify-content-center create-room-error-container"
                      : ""
                  }
                >
                  <span className={errors[key.name] ? "create-room-error" : ""}>
                    {errors[key.name]?.message}
                  </span>
                </p>
              </div>
            );
          })}

          <div className="input-group mb-4 mx-auto">
            <label className="mr-2 mt-1" htmlFor="description">
              Description:
            </label>
            <textarea
              name="description"
              id="description"
              className="form-control col-7"
              placeholder="Write a description..."
              ref={register}
            />
          </div>
          <button>submit</button>
        </form>
      </div>
    </section>
  );
};
