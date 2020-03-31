import React from "react";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";
import { Title } from "./globals/Title";

export const Services = () => {
  const services = [
    {
      icon: <FaCocktail />,
      title: "free coctails",
      info:
        "Quite nothing takes the hearts of men and women during this hot summer as our free coctails offer"
    },
    {
      icon: <FaHiking />,
      title: "Endless Hiking",
      info: "Enjoy yourself to the fullest with hiking till your legs give in"
    },
    {
      icon: <FaShuttleVan />,
      title: "Free Shuttle",
      info: "We will take you everywhere that your wildest heart desires"
    },
    {
      icon: <FaBeer />,
      title: "Strongest Beer",
      info: "Never before have you encountered as good of a Beer as ours"
    }
  ];
  return (
    <section className="services">
      <div className="container">
        <Title title="services" />
        <div className="row text-center mt-5">
          {services.map((key, index) => {
            return (
              <article
                className="col-lg-3 col-md-6 col-sm-10 mx-auto"
                key={index}
              >
                <div className="services-icon">{key.icon}</div>
                <h5 className="services-header">{key.title}</h5>
                <p className="services-info">{key.info}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
