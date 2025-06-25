import React from "react";
import womenCollectionImage from "../../assets/womens-collection.webp";
import menCollectionImage from "../../assets/mens-collection.webp";
import { Link } from "react-router-dom";

export default function GenderCollectionSection() {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        <div className="relative flex-1">
          <img
            src={womenCollectionImage}
            className="w-full h-[700px] object-cover"
            alt="Women Collection"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Women's Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
        <div className="relative flex-1">
          <img
            src={menCollectionImage}
            className="w-full h-[700px] object-cover"
            alt="Men Collection"
          />
          <div className="absolute bottom-8 left-8 bg-white bg-opacity-90 p-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Men's Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="text-gray-900 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
