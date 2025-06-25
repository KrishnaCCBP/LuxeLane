import React from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductsByFilters,setFilters } from "../../redux/slices/productsSlice";

export default function SearchBar() {
  const [searchValue, setSearchValue] = React.useState("");
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openSearchForm = () => {
    setIsOpen(true);
  };

  const closeSearchForm = () => {
    setIsOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(setFilters({search:searchValue}));
    dispatch(fetchProductsByFilters({search:searchValue}));
    navigate(`/collections/all?search=${searchValue}`)
    setIsOpen(false);
  };

  return (
    <div
      className={`flex items-center justify-center w-full transition-all duration-300 ${
        isOpen ? "absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"
      }`}
    >
      {isOpen ? (
        <form
          onSubmit={handleFormSubmit}
          className="relative flex items-center justify-center w-full"
        >
          <div className="relative w-1/2">
            <input
              type="text"
              value={searchValue}
              placeholder="Search"
              onChange={(e) => setSearchValue(e.target.value)}
              className="bg-gray-100 px-4 py-2 pl-2 pr-12 rounded-lg focus:outline-none w-full placeholder:text-gray-700"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
            >
              <HiMagnifyingGlass className="h-6 w-6" />
            </button>
          </div>
          <button
            type="button"
            onClick={closeSearchForm}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
          >
            <HiMiniXMark className="h-6 w-6" />
          </button>
        </form>
      ) : (
        <button onClick={openSearchForm}>
          <HiMagnifyingGlass className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
