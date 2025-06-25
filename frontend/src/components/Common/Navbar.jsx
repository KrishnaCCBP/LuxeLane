import React from "react";
import { HiOutlineShoppingBag, HiOutlineUser } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import CartDrawer from "../Layout/CartDrawer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [isDrawerOpen, setISDrawerOpen] = React.useState(false);
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const cartItemCount =
    cart.products.reduce((total, product) => total + product.quantity, 0) || 0;

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const openCartDrawer = () => {
    setISDrawerOpen(true);
  };
  const closeCartDrawer = () => {
    setISDrawerOpen(false);
  };
  return (
    <>
      <nav className="container mx-auto flex justify-between items-center py-3 px-6">
        <div>
          <Link to="/" className="text-2xl font-medium">
            LuxeLane
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/collections/all?gender=Men"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Men
          </Link>
          <Link
            to="/collections/all?gender=Women"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Women
          </Link>
          <Link
            to="/collections/all?category=Top Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Top wear
          </Link>
          <Link
            to="/collections/all?category=Bottom Wear"
            className="text-gray-700 hover:text-black text-sm font-medium uppercase"
          >
            Bottom wear
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {user && user.role === "Admin" && (
            <Link
              to="/admin"
              className="block rounded px-2 text-white text-sm bg-black"
            >
              Admin
            </Link>
          )}
          <Link to="/profile">
            <HiOutlineUser className="h-6 w-6 text-gray-700" />
          </Link>
          <button
            onClick={openCartDrawer}
            className="relative hover:text-black"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-luxelane-red text-white text-xs font-medium rounded-full px-1">
                {cartItemCount}
              </span>
            )}
          </button>
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          <button onClick={toggleNav} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </nav>
      <CartDrawer
        isDrawerOpen={isDrawerOpen}
        closeCartDrawer={closeCartDrawer}
      />
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:1/3 h-full bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNav}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/collections/all?gender=Men"
              onClick={toggleNav}
              className="block text-gray-600 hover:text-black uppercase"
            >
              Men
            </Link>
            <Link
              to="/collections/all?gender=Women"
              onClick={toggleNav}
              className="block text-gray-600 hover:text-black uppercase"
            >
              Women
            </Link>
            <Link
              to="/collections/all?category=Top Wear"
              onClick={toggleNav}
              className="block text-gray-600 hover:text-black uppercase"
            >
              TopWear
            </Link>
            <Link
              to="/collections/all?category=Bottom Wear"
              onClick={toggleNav}
              className="block text-gray-600 hover:text-black uppercase"
            >
              Bottom Wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
