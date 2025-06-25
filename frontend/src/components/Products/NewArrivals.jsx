import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
export default function NewArrivals() {
  const scrollerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // const newArrivals = [
  //   {
  //     _id: "1",
  //     name: "Jeans",
  //     price: "150",
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=1",
  //         altText: "Jeans",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "2",
  //     name: "Jeans",
  //     price: "150",
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=2",
  //         altText: "Jeans",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "3",
  //     name: "Jeans",
  //     price: "150",
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=3",
  //         altText: "Jeans",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "4",
  //     name: "Jeans",
  //     price: "150",
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=4",
  //         altText: "Jeans",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "5",
  //     name: "Jeans",
  //     price: "150",
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=5",
  //         altText: "Jeans",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "6",
  //     name: "Jeans",
  //     price: "150",
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=6",
  //         altText: "Jeans",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "7",
  //     name: "Jeans",
  //     price: "150",
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=7",
  //         altText: "Jeans",
  //       },
  //     ],
  //   },
  //   {
  //     _id: "8",
  //     name: "Jeans",
  //     price: "150",
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=8",
  //         altText: "Jeans",
  //       },
  //     ],
  //   },
  // ];

  const [newArrivals, setNewArrivals] = useState([]);

  const scrollAction = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollerRef.current.scrollBy({ left: scrollAmount, behaviour: "smooth" });
  };

  const updateScrollButtons = () => {
    const container = scrollerRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }

    // console.log({
    //   scrollLeft: container.scrollLeft,
    //   clientWidth: container.clientWidth,
    //   containerScrollWidth: container.scrollWidth,
    //   offsetLeft: container.offsetLeft
    // });
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollerRef.current.offsetLeft);
    setScrollLeft(scrollerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollerRef.current.offsetLeft;
    const walk = x - startX;
    scrollerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUporLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        let response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`
        );
        setNewArrivals(response.data)
      } catch (error) {
        console.error(error);
      }
    };

    fetchNewArrivals();
  }, []);

  useEffect(() => {
    const container = scrollerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
      updateScrollButtons();
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, [newArrivals]);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Hot Off the Press!</h2>
        <p className="text-lg text-gray-900 mb-8">
          Shop our latest arrivals and stay ahead of the fashion curve.
        </p>
        {/* Scrollable Buttons */}
        <div className="absolute right-0 bottom-[-35px] flex space-x-2 px-2">
          <button
            onClick={() => {
              scrollAction("left");
            }}
            disabled={!canScrollLeft}
            className={`rounded-full p-2 border ${
              canScrollLeft
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => {
              scrollAction("right");
            }}
            disabled={!canScrollRight}
            className={`rounded-full p-2 border ${
              canScrollRight
                ? "bg-white text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>
      {/* Scrollable Content */}
      <div
        ref={scrollerRef}
        className={`container mx-auto flex space-x-6 overflow-x-scroll relative ${
          isDragging ? "cursor-grabbing" : "cursor-grabbed"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUporLeave}
        onMouseLeave={handleMouseUporLeave}
      >
        {newArrivals.map((item) => (
          <div
            key={item._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
          >
            <img
              src={item.images[0]?.url}
              alttext={item.name || item.images[0]?.altText}
              className="w-full h-[500px] object-cover rounded-lg"
              draggable="false"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${item._id}`} className="block">
                <h4 className="font-medium">{item.name}</h4>
                <p className="mt-1">${item.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
