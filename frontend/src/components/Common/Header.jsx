import React from "react";
import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="border-b border-gray-300">
      <Topbar />
      <Navbar />
      {
        //Topbar
        //Navbar
        //CartDrawer
      }
    </header>
  );
}
