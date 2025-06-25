import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";

export default function Topbar() {
  return (
    <div className="bg-luxelane-red text-white">
      <div className="container mx-auto flex justify-between items-center py-3 px-10">
        <div className="hidden md:flex items-center gap-4">
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <RiTwitterXLine className="h-4 w-4" />
          </a>
        </div>
        <div className="text-sm text-center flex-grow">
          <span>Shop the World: Quick Delivery, Tailored for Every Taste!</span>
        </div>
        <div className="text-sm hidden md:block">
          <a href="tel:+1234567890" className="hover:text-gray-300">
            +91-9912111111
          </a>
        </div>
      </div>
    </div>
  );
}
