import React from "react";
import { Link } from "react-router-dom";
import featured from "../../assets/featured.webp"

export default function FeaturedCollection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl">
        <div className="lg:w-1/2 p-8 text-center lg:text-left">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Elevate Your Wardrobe
          </h2>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Discover Our Featured Collection
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Step into style with our Featured Collection! This selection
            highlights the latest trends and timeless classics that every
            fashionista needs. Browse through and discover pieces that resonate
            with your style.
          </p>
          <Link
            to="/collections/all"
            className="bg-black text-white text-lg rounded-lg px-6 py-3 hover:bg-gray-800"
          >
            Shop Now
          </Link>
        </div>
        <div className="lg:w-1/2">
            <img src={featured} alt="Featured" className="w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl"/>
        </div>
      </div>
    </section>
  );
}
