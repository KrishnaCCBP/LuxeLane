import React from "react";
import heroImg from "../../assets/rabbit-hero.webp";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative">
      <img
        src={heroImg}
        alt="LuxeLane"
        className="w-full h-[400px] md:h-[600px] lg:h-[750px] object-cover"
      />
      <div className="absolute inset-0 bg-transparent bg-opacity-5 flex items-center justify-center">
        <div className="text-white text-center p-6">
          <h1 className="text-4xl md:text-8xl font-bold tracking-tighter uppercase mb-4">
            Step Into
            <br /> Style
          </h1>
          <p className="text-sm tracking-tighter md:text-lg mb-6">
            Find the perfect pieces that make you feel confident and chic every
            day.
          </p>
          <Link
            to="#"
            className="bg-white text-gray-950 px-6 py-2 rounded-sm text-lg"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}
