import React, { useEffect, useRef, useState } from "react";
import "../src/assets/Carousel.css";

const carouselData = [
  {
    id: 1,
    img: "https://64.media.tumblr.com/c8635a3546c50f08abcd1dd5a33fbee5/tumblr_njoxaoUTrj1rfp1lho1_1280.gif",
    author: "LUNDEV",
    title: "DESIGN SLIDER",
    topic: "NATURE",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt...",
  },
  {
    id: 2,
    img: "https://i.pinimg.com/originals/f9/47/74/f94774094cdb0632c80e94a27d4de239.gif",
    author: "LUNDEV",
    title: "DESIGN SLIDER",
    topic: "NATURE",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt...",
  },
  {
    id: 3,
    img: "https://i.imgur.com/UJ7bOyZ.gif",
    author: "LUNDEV",
    title: "DESIGN SLIDER",
    topic: "NATURE",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt...",
  },
  {
    id: 4,
    img: "https://www.sagamuseum.is/wp-content/uploads/2017/02/background-waterfall.gif",
    author: "LUNDEV",
    title: "DESIGN SLIDER",
    topic: "ANIMAL",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi, rem magnam nesciunt...",
  },
];

const Carousel = () => {
  const nextButtonRef = useRef(null);
  const prevButtonRef = useRef(null);
  const carouselRef = useRef(null);
  const listRef = useRef(null);
  const [slides, setSlides] = useState(carouselData);
  let unAcceppClick;

  useEffect(() => {
    const nextButton = nextButtonRef.current;
    const prevButton = prevButtonRef.current;
    const carousel = carouselRef.current;
    const listHTML = listRef.current;

    const showSlider = (type) => {
      nextButton.style.pointerEvents = "none";
      prevButton.style.pointerEvents = "none";

      carousel.classList.remove("next", "prev");
      const items = listHTML.querySelectorAll(".item");
      if (type === "next") {
        listHTML.appendChild(items[0]);
        carousel.classList.add("next");
      } else {
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add("prev");
      }
      clearTimeout(unAcceppClick);
      unAcceppClick = setTimeout(() => {
        nextButton.style.pointerEvents = "auto";
        prevButton.style.pointerEvents = "auto";
      }, 2000);
    };

    const handleNext = () => showSlider("next");
    const handlePrev = () => showSlider("prev");

    nextButton.addEventListener("click", handleNext);
    prevButton.addEventListener("click", handlePrev);

    return () => {
      nextButton.removeEventListener("click", handleNext);
      prevButton.removeEventListener("click", handlePrev);
    };
  }, []);

  return (
    <div className="carousel" ref={carouselRef}>
      <div className="list" ref={listRef}>
        {slides.map((item) => (
          <div className="item" key={item.id}>
            <img src={item.img} alt={`slide-${item.id}`} />
            <div className="content">
              <div className="author">{item.author}</div>
              <div className="title">{item.title}</div>
              <div className="topic">{item.topic}</div>
              <div className="des">{item.description}</div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="thumbnail">
        {slides.map((item) => (
          <div className="item" key={`thumb-${item.id}`}>
            <img src={item.img} alt={`thumb-${item.id}`} />
            <div className="content">
              <div className="title">Name Slider</div>
              <div className="description">Description</div>
            </div>
          </div>
        ))}
      </div>

      <div className="arrows">
        <button id="prev" ref={prevButtonRef}>
          {"<"}
        </button>
        <button id="next" ref={nextButtonRef}>
          {">"}
        </button>
      </div>

      <div className="time"></div>
    </div>
  );
};

export default Carousel;
