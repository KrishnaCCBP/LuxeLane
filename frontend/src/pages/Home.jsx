import React, { useEffect, useState } from "react";
import HeroSection from "../components/Layout/HeroSection";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetails from "../components/Products/ProductDetails";
import SimilarProducts from "../components/Products/SimilarProducts";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturedSection from "../components/Layout/FeaturedSection";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilters } from "../redux/slices/productsSlice";
import axios from "axios";

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  // const recommendedProducts = [
  //   {
  //     _id: "1",
  //     name: "Product 1",
  //     price: "120",
  //     images: [{ url: "https://picsum.photos/500/500?random=13" }],
  //   },
  //   {
  //     _id: "2",
  //     name: "Product 2",
  //     price: "150",
  //     images: [{ url: "https://picsum.photos/500/500?random=14" }],
  //   },
  //   {
  //     _id: "3",
  //     name: "Product 3",
  //     price: "160",
  //     images: [{ url: "https://picsum.photos/500/500?random=15" }],
  //   },
  //   {
  //     _id: "4",
  //     name: "Product 4",
  //     price: "200",
  //     images: [{ url: "https://picsum.photos/500/500?random=16" }],
  //   },
  //   {
  //     _id: "5",
  //     name: "Product 5",
  //     price: "120",
  //     images: [{ url: "https://picsum.photos/500/500?random=1" }],
  //   },
  //   {
  //     _id: "6",
  //     name: "Product 6",
  //     price: "150",
  //     images: [{ url: "https://picsum.photos/500/500?random=2" }],
  //   },
  //   {
  //     _id: "7",
  //     name: "Product 7",
  //     price: "160",
  //     images: [{ url: "https://picsum.photos/500/500?random=3" }],
  //   },
  //   {
  //     _id: "8",
  //     name: "Product 8",
  //     price: "200",
  //     images: [{ url: "https://picsum.photos/500/500?random=4" }],
  //   },
  // ]

  useEffect(() => {
    // Fetch products for specific collection
    dispatch(
      fetchProductsByFilters({
        gender: "Women",
        category: "Bottom Wear",
        limit: 8,
      })
    );

    // Fetch best-seller products
    const fetchBestSeller = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`
        );
        setBestSellerProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  return (
    <div>
      <HeroSection />
      <GenderCollectionSection />
      <NewArrivals />
      <h2 className="text-3xl text-center font-bold mb-4">Best Seller</h2>
      {bestSellerProduct ? (
        <ProductDetails productId={bestSellerProduct._id} />
      ) : (
        <p className="text-center">Loading best seller products....</p>
      )}
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">Top Women Wear</h2>
        <SimilarProducts products={products} loading={loading} error={error} />
      </div>
      <FeaturedCollection />
      <FeaturedSection />
    </div>
  );
}
