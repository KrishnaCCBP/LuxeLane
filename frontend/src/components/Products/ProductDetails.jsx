import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import SimilarProducts from "./SimilarProducts";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductById,
  fetchSimilarProducts,
} from "../../redux/slices/productsSlice";
import { addToCart } from "../../redux/slices/cartSlice";

export default function ProductDetails({ productId }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { chosenProduct, loading, error, similarProducts } = useSelector(
    (state) => state.products
  );

  const { user, guestId } = useSelector((state) => state.auth);

  const [firstImage, setFirstImage] = useState(null);
  const [chosenColor, setChosenColor] = useState(null);
  const [chosenSize, setChosenSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabaled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductById(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (chosenProduct?.images?.length > 0) {
      setFirstImage(chosenProduct.images[0].url);
    }
  }, [chosenProduct]);

  const handleQuantity = (operation) => {
    if (operation === "plus") setQuantity((prev) => prev + 1);
    if (operation === "minus" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!chosenColor || !chosenSize) {
      toast.error("Please select a color and size before adding to cart", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabaled(true);
    // setTimeout(() => {
    //   toast.success("Product successfully added to cart!!", { duration: 1000 });
    //   setIsButtonDisabaled(false);
    // }, 500);
    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: chosenSize,
        color: chosenColor,
        guestId,
        userId: user?._id,
      })
    )
      .then(() => {
        toast.success("Product added to cart!", {
          duration: 1000,
        });
      })
      .finally(() => {
        setIsButtonDisabaled(false);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error:{error}</p>;
  }

  return (
    <div className="p-6">
      {chosenProduct && (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* Left Thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {chosenProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    firstImage === image.url
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() => {
                    setFirstImage(image.url);
                  }}
                />
              ))}
            </div>
            {/* Main Image */}
            <div className="md:w-1/2">
              <div className="mb-4">
                <img
                  src={firstImage}
                  alt="Main Item"
                  className="w-full h-auto object-cover rounded-lg"
                />
              </div>
            </div>
            {/* Bottom Thumbnails */}
            <div className="flex space-x-4 overscroll-x-scroll mb-4 md:hidden ">
              {chosenProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={image.altText}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    firstImage === image.url
                      ? "border-black"
                      : "border-gray-300"
                  }`}
                  onClick={() => {
                    setFirstImage(image.url);
                  }}
                />
              ))}
            </div>
            {/* Right Side */}
            <div className="md:w-1/2 md:ml-10">
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {chosenProduct.name}
              </h1>
              <p className="text-lg text-gray-600 mb-1 line-through">
                {chosenProduct.originalPrice &&
                  `${chosenProduct.originalPrice}`}
              </p>
              <p className="text-xl text-gray-500 mb-2">
                $ {chosenProduct.price}
              </p>
              <p className="text-gray-600 mb-4">{chosenProduct.description}</p>
              <div className="mb-4">
                <p className="text-gray-700">Color:</p>
                <div className="flex gap-2 mt-2">
                  {chosenProduct.colors.map((color) => (
                    <button
                      type="button"
                      key={color}
                      className={`cursor-pointer rounded-full border w-8 h-8 ${
                        chosenColor === color
                          ? "border-4 border-black"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: color.toLocaleLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                      onClick={() => {
                        setChosenColor(color);
                      }}
                    ></button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-700">Size:</p>
                <div className="flex gap-2 mt-2">
                  {chosenProduct.sizes.map((size) => (
                    <button
                      type="button"
                      key={size}
                      className={`cursor-pointer rounded border px-4 py-2 ${
                        chosenSize === size ? "bg-black text-white" : ""
                      }`}
                      onClick={() => {
                        setChosenSize(size);
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <p className="text-gray-700">Quantity:</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => {
                      handleQuantity("minus");
                    }}
                    className="px-2 py-1 rounded bg-gray-200 text-lg"
                  >
                    -
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    onClick={() => {
                      handleQuantity("plus");
                    }}
                    className="px-2 py-1 rounded bg-gray-200 text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                disabled={isButtonDisabled}
                onClick={() => {
                  handleAddToCart();
                }}
                className={`${
                  isButtonDisabled
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-900"
                } bg-black text-white px-6 py-2 w-full rounded mb-4 uppercase`}
              >
                {isButtonDisabled ? "Adding...." : "Add to cart"}
              </button>
              <div className="mt-10 text-gray-700">
                <h3 className="text-xl font-bold mb-4">Characteristics:</h3>
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody>
                    <tr>
                      <td className="py-1">Brand</td>
                      <td className="py-1">{chosenProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Material</td>
                      <td className="py-1">{chosenProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <h2 className="text-2xl text-center font-medium mb-4">
              You May Also Like
            </h2>
            <SimilarProducts products={similarProducts} />
          </div>
        </div>
      )}
    </div>
  );
}
