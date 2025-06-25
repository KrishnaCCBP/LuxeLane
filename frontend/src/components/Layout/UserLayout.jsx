import React from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet/>
      </main>
      <Footer />
    </div>
  );
}
