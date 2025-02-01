import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import FrameImage01 from "../../assets/FrameImage01.png";

import Carousel from "../../components/Carousel";
import MaterialIcons from "../../components/MaterialIcons";

const Landing = () => {
  const [productsData, setProductsData] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:3000/api/products/getAll"
      );

      console.log("Fetched products:", response.data.data);
      setProductsData(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-gray-100">
      {/* Hero Banner */}
      <section className="container mx-auto my-6 p-4">
        <img
          src="https://via.placeholder.com/1200x300"
          alt="Hero Banner"
          className="w-full rounded"
        />
      </section>
      <Carousel />
      {/* Best Selling Products */}
      <section className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Flash Sales</h2>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
          }}
        >
          {productsData.map((product) => (
            <SwiperSlide key={product.id}>
              <div className="bg-white p-4 rounded shadow">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded"
                />
                <p className="mt-2 font-bold">{product.name}</p>
                <p className="text-red-500 font-bold">${product.price}</p>
                <p className="text-gray-400 line-through">
                  ${product.originalPrice || product.price * 1.2}
                </p>
                <button className="mt-2 bg-black text-white px-4 py-2 rounded">
                  Add to Cart
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      {/* Categories */}
      <div>
        <h1>category</h1>

        <div>
          <div className="flex items-center space-x-2 pb-4">
            <div className="bg-red-700 w-5 h-10 rounded"></div>
            <h2 className="text-red-700">Categories</h2> {/* Darker red */}
          </div>

          <h1 className="text-4xl font-bold pb-20">Browse By Category</h1>
        </div>

        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />

        <div className="flex flex-wrap justify gap-6">
          {/* Swiper for category icons */}
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            pagination={{ clickable: true }}
            
          >
            {["phone_iphone", "computer", "watch", "camera", "headphones", "sports_esports"].map((icon, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center p-4 bg-white border border-gray-300 rounded-lg h-50 w-80">
                  <span className="material-symbols-outlined text-[48px] font-normal h-20 w-20">
                    {icon}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      {/* Best Selling Products */}
      <section className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Best Selling</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <img src="https://via.placeholder.com/150" className="w-full" />
            <p className="mt-2">Product Name</p>
            <p className="text-red-500 font-bold">$99.99</p>
          </div>
          {/* Repeat similar divs for more products */}
        </div>
      </section>

      {/* Top hit product */}
      <div className="flex justify-center items-center p-6">
        <img src={FrameImage01} alt="to hit product" />
      </div>

      {/* Promotional Banner */}
      <section className="container mx-auto my-6 p-4">
        <img
          src="https://via.placeholder.com/1200x200"
          alt="Promo Banner"
          className="w-full rounded"
        />
      </section>
      {/* Explore Products */}
      <section className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Explore Our Products</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <img src="https://via.placeholder.com/150" className="w-full" />
            <p className="mt-2">New Arrival</p>
            <p className="text-red-500 font-bold">$89.99</p>
          </div>
          {/* Repeat for more products */}
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-6">
        &copy; 2025 E-shop. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
