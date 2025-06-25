import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-15 px-4">
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
          <p className="text-gray-600 text-sm font-medium mb-6">
            "Become a part of our vibrant community! Sign up for our newsletter
            to receive style tips, product highlights, and updates straight to
            your inbox. Plus, enjoy a welcome gift on your first order!"
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all required"
            />
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-700 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <nav className="space-y-4 text-gray-600">
            <Link
              to="#"
              className="block hover:text-gray-500 transition-colors"
            >
              Men's top wear
            </Link>
            <Link
              to="#"
              className="block hover:text-gray-500 transition-colors"
            >
              Women's top wear
            </Link>
            <Link
              to="#"
              className="block hover:text-gray-500 transition-colors"
            >
              Men's bottom wear
            </Link>
            <Link
              to="#"
              className="block hover:text-gray-500 transition-colors"
            >
              Womens's bottom Wear
            </Link>
          </nav>
        </div>
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <nav className="space-y-4 text-gray-600">
            <Link
              to="#"
              className="block hover:text-gray-500 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="#"
              className="block hover:text-gray-500 transition-colors"
            >
              About Us
            </Link>
            <Link
              to="#"
              className="block hover:text-gray-500 transition-colors"
            >
              FAQs
            </Link>
            <Link
              to="#"
              className="block hover:text-gray-500 transition-colors"
            >
              Features
            </Link>
          </nav>
        </div>
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Follow Us</h3>
          <div className="flex items-center space-x-4 mb-6">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500"
            >
              <RiTwitterXLine className="h-4 w-4" />
            </a>
          </div>
          <p className="text-gray-500">Call Us</p>
          <p>
            <FiPhoneCall className="inline-block mr-2" />
            +91-9912111111
          </p>
        </div>
      </div>
      <div className="container mx-auto mt-12 px-4 border-t border-gray-200 pt-6">
        <p className="text-gray-500 text-sm tracking-tighter text-center">
          &copy; 2025, LuxeLane. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
