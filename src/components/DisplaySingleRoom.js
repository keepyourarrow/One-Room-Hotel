import React, { useState } from "react";
import StyledHero from "./globals/StyledHero";
import { Banner } from "./globals/Banner";
import { Link } from "react-router-dom";
import { Cart } from "./Cart";

export const DisplaySingleRoom = ({ room }) => {
  // for carousel
  let [isClicked, setIsClicked] = useState(false);
  let [currentImage, setCurrentImage] = useState("");
  let [imageIndex, setImageIndex] = useState(0);

  const handleCarousel = (e) => {
    setIsClicked(!isClicked);
    // disable scrolling
    document.body.style.overflow = !isClicked ? "hidden" : "auto";

    //Find index of image array and set the current image
    if (e.target.src) {
      room.images.map((image, index) => {
        if (image === e.target.src.substring(21)) {
          setImageIndex(index);
        }
        return image;
      });
      setCurrentImage(room.images[e.target.alt]);
    }
  };

  const handleKeyPress = (e) => {
    let tempImageIndex = imageIndex;

    if (e.key === "Escape") {
      setIsClicked(false);
      document.body.style.overflow = "auto";
    }

    if (e.key === "ArrowLeft") {
      if (tempImageIndex === 0) {
        tempImageIndex = room.images.length;
      }
      setCurrentImage(room.images[--tempImageIndex]);
    }

    if (e.key === "ArrowRight") {
      if (tempImageIndex === room.images.length - 1) {
        tempImageIndex = -1;
      }
      setCurrentImage(room.images[++tempImageIndex]);
    }

    setImageIndex(tempImageIndex);
  };

  const handleCarouselMoving = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let tempImageIndex = imageIndex;
    let positionOfClick = e.clientX;
    let imageWidth = e.currentTarget.offsetWidth;

    if (positionOfClick > imageWidth / 2) {
      if (tempImageIndex === room.images.length - 1) {
        tempImageIndex = -1;
      }
      setCurrentImage(room.images[++tempImageIndex]);
    } else {
      if (tempImageIndex === 0) {
        tempImageIndex = room.images.length;
      }
      setCurrentImage(room.images[--tempImageIndex]);
    }

    setImageIndex(tempImageIndex);
  };

  let images = room.images.map((key, index) => {
    return (
      <div className="col-lg-4 col-sm-6 col-10 my-4" key={index}>
        <img
          src={key}
          alt={index}
          className="img-fluid"
          onClick={handleCarousel}
        />
      </div>
    );
  });

  return (
    <>
      <StyledHero img={room.images[0]}>
        <Cart />
        <Banner title={`${room.name} room`}>
          <Link to="/rooms" className="btn-primary text-uppercase">
            back to rooms
          </Link>
        </Banner>
      </StyledHero>
      <section className="single-room" onKeyDown={handleKeyPress} tabIndex="0">
        <article id="gallery" className="container">
          <div className="row mt-3 pt-5 justify-content-start">{images}</div>
        </article>

        <div id="room-info" className="container-fluid single-room-info mt-4">
          <div className="row ">
            <article className="col-lg-6  col-12 mx-auto room-description">
              <h3 className="text-capitalize text-center">details</h3>
              <p>{room.description}</p>
            </article>

            <article className="col-lg-5  col-10 ml-md-auto mx-auto text-capitalize room-info text-center">
              <h3 className="text-center">info</h3>
              <h6>
                price: <span>${room.price}</span>
              </h6>
              <h6>
                size: <span>{room.size} SQFT</span>
              </h6>
              <h6>
                max Capacity:
                <span>
                  {room.capacity > 1
                    ? `${room.capacity} people`
                    : `${room.capacity} person`}
                </span>
              </h6>
              <h6>{room.pets ? "pets allowed" : "No Pets allowed"}</h6>
              <h6>{room.breakfast && "free breakfast included"}</h6>
            </article>
          </div>
        </div>

        <article id="room-extras" className="container room-extras">
          <h3 className="mt-5 mb-4">Extras:</h3>
          <div className="row">
            {room.extras.map((room, index) => {
              return (
                <div className="col-lg-4 col-md-6 col-10 mb-3" key={index}>
                  - {room}
                </div>
              );
            })}
          </div>
        </article>

        {/* Modal */}
        <div
          className={(isClicked ? "visible" : "") + " carouselRoot"}
          onClick={handleCarousel}
        >
          <div className="carousel-image" onClick={handleCarouselMoving}>
            <img src={currentImage} className="img-fluid" alt={imageIndex} />
            <span
              className="esc"
              onClick={(e) => {
                setIsClicked(false);
                document.body.style.overflow = !isClicked ? "hidden" : "auto";
              }}
            >
              x
            </span>
            <i className="fa fa-chevron-left left"></i>
            <i className="fa fa-chevron-right right"></i>
          </div>
        </div>
        {/* End of Modal */}
      </section>
    </>
  );
};
