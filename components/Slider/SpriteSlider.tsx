"use client";

import React, { ReactNode, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  children: ReactNode;
  slidesToShow?: number;
}

const SpriteSlider = ({ children, slidesToShow = 1 }: Props) => {
  const [currentPosition, setCurrentPosition] = useState(0);

  const totalSlides = React.Children.count(children);
  const slideWidth = 100 / slidesToShow;

  const nextSlide = () => {
    setCurrentPosition((prevPosition) =>
      Math.min(prevPosition + 1, totalSlides - slidesToShow)
    );
  };

  const prevSlide = () => {
    setCurrentPosition((prevPosition) => Math.max(prevPosition - 1, 0));
  };

  const handleTouchStart = (e: any) => {
    const touchStartX = e.touches[0].clientX;

    const handleTouchMove = (e: any) => {
      const touchMoveX = e.touches[0].clientX;
      const deltaX = touchStartX - touchMoveX;

      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }

        document.removeEventListener("touchmove", handleTouchMove);
      }
    };

    document.addEventListener("touchmove", handleTouchMove);
  };

  return (
    <div
      className="w-full relative overflow-hidden"
      onTouchStart={handleTouchStart}
    >
      <div
        className="w-full flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentPosition * slideWidth}%)`,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-full flex items-center justify-center`}
            style={{ width: `${slideWidth}%` }}
          >
            {child}
          </div>
        ))}
      </div>
      {currentPosition > 0 && (
        <button
          title="Left"
          type="button"
          className="absolute bottom-0 left-0 rounded-lg p-1  bg-slate-800/20 dark:bg-slate-200/20 text-white"
          onClick={prevSlide}
        >
          <FaChevronLeft size={20} />
        </button>
      )}
      {currentPosition < totalSlides - slidesToShow && (
        <button
          title="Right"
          type="button"
          className="absolute bottom-0 right-0 rounded-lg p-1 bg-slate-800/20 dark:bg-slate-200/20 text-white"
          onClick={nextSlide}
        >
          <FaChevronRight size={20} />
        </button>
      )}

      {currentPosition < totalSlides - slidesToShow - 1 && (
        <div
          className="absolute top-0 bottom-0 right-0 bg-gradient-to-l from-transparent to-slate-800/20 dark:to-slate-200/20 w-12"
          style={{
            width: `${(100 / slidesToShow) * 0.5}%`, // Adjust the width as needed
          }}
        />
      )}
    </div>
  );
};

export default SpriteSlider;
