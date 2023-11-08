import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextArrowIcon from "../icon/NextArrowIcon";
import PrevArrowIcon from "../icon/PrevArrowIcon";

function CustomSlider({ children }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    nextArrow: <NextArrowIcon />,
    prevArrow: <PrevArrowIcon />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <Slider style={{ display: "flex" }} {...settings}>
      {children}
    </Slider>
  );
}

export default CustomSlider;
