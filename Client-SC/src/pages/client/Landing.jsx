import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import FrameImage01 from "../../assets/FrameImage01.png";
import Frame740 from "../../assets/Frame740.png";
import Carousel from "../../components/Carousel";

import Footer from "../../assets/Footer.png";
import Frame702 from "../../assets/Frame702.png";
import Frame719 from "../../assets/Frame719.png";
import Frame741 from "../../assets/Frame741.png";

////// images imports
import laptops from "../../assets/Category-Phone01.png";
import Smartwatchs from "../../assets/Category-Phone02.png";
import Cameras from "../../assets/Category-Phone03.png";
import Headphones from "../../assets/Category-Phone04.png";
import Gamings from "../../assets/Category-Phone05.png";

////// images imports

// import MaterialIcons from "../../components/MaterialIcons";

const Landing = () => {
  const [productsData, setProductsData] = useState([]);
  const [eightProducts, seteightProducts] = useState([]);
  const [categories,setCategories]=useState([])
  const firsteightss = function (dataa) {
    const res = dataa.slice(0, 8);
    seteightProducts(res);
    return;
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:3000/api/products/getAll"
      );

      console.log("Fetched products:", response.data.data);
      firsteightss(response.data.data);
      setProductsData(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:3000/api/categories/getAll"
      );
      console.log("Fetched categories:", response.data.data);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="bg-white-100">
      <div className="flex border-t border-b border-gray-300">
        {/* Sidebar */}
        <div className="w-1/5 bg-white text-black border-r border-gray-300">
          <ul className="space-y-4 pl-20">
            {categories.map(categ=>(
              <li className="text-base">{categ}</li>
            ))}
          </ul>
        </div>

        {/* Carousel */}
        <div className="flex-1">
          <Carousel className="ml-20 mr-20" />
        </div>
      </div>

      {/* Best Selling Products */}
      <section className="container mx-auto p-4 pt-30 pb-30">
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

      {/* Category Carousel */}
      
      {/* Browse By Category Section */}
      <div className="container mx-auto p-3 pt-30 pb-30">
        {/* Centered Title with Red Bar */}
        <div className="flex flex-col mb-4">
          <div className="flex gap-2">
            <div className="w-3 h-6 bg-red-600 rounded-md"></div>
            <span className="text-red-600 font-semibold text-lg">
              This Month
            </span>
          </div>
          <h2 className="text-3xl font-bold mt-1 ">
            Browse By Category
          </h2>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={6}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            1024: { slidesPerView: 6 },
            768: { slidesPerView: 3 },
            480: { slidesPerView: 2 },
          }}
        >
          {[
            laptops,
            Smartwatchs,
            Cameras,
            Headphones,
            Gamings,
            laptops,
            Smartwatchs,
            Cameras,
            Headphones,
            Gamings,
          ].map((image, index) => (
            <SwiperSlide key={index}>
             
                <img
                  src={image}
                  alt={`Category ${index}`}
                  className="w-24 h-24 object-contain rounded "
                />
        
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Best Selling Products */}
      <section className="container mx-auto p-4 pt-30 pb-30">
        {/* Title Section with "View All Products" Button */}
        <div className="flex justify-between items-center mb-4">
          {/* Left Side: "This Month" with Red Bar & Title */}
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-6 bg-red-600 rounded-md"></div>
              <span className="text-red-600 font-semibold text-lg">
                This Month
              </span>
            </div>
            <h2 className="text-3xl font-bold mt-1">Best Selling Products</h2>
          </div>

          {/* Right Side: "View All Products" Button */}
          <NavLink
            to="/client/products"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
          >
            View All Products
          </NavLink>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-4 gap-4">
          {productsData.slice(0, 4).map((product) => (
            <div key={product.id} className="bg-white p-4 rounded shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <p className="mt-2 font-bold">{product.name}</p>
              <p className="text-red-500 font-bold">${product.price}</p>
              <p className="text-gray-400 line-through">
                ${product.originalPrice || (product.price * 1.2).toFixed(2)}
              </p>
              <button className="mt-2 bg-black text-white px-4 py-2 rounded">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Top hit product */}
      <div className="flex justify-center items-center p-6">
        <img src={FrameImage01} alt="to hit product" />
      </div>

      {/* Explore Products */}
      <section className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Explore Our Products</h2>

        <div className="grid grid-cols-4 gap-4">
          {eightProducts?.map((product) => (
            <div
              key={product.id}
              className="bg-white p-4 rounded shadow relative group overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded transition-transform group-hover:scale-105"
              />
              <p className="mt-2 font-bold">{product.name}</p>
              <p className="text-red-500 font-bold">${product.price}</p>
              <p className="text-gray-400 line-through">
                ${product.originalPrice || (product.price * 1.2).toFixed(2)}
              </p>

              {/* Add to Cart Button - Appears from the bottom (20%) */}
              <button
                className="absolute bottom-0 left-0 w-full h-0 bg-black text-white text-lg font-semibold flex items-center justify-center opacity-0 transition-all duration-300 
          group-hover:h-[20%] group-hover:opacity-100"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="flex justify-center mt-6">
          <button className="bg-red-600 text-white px-6 py-3 rounded text-lg font-semibold hover:bg-red-700 transition">
            View All Products
          </button>
        </div>
      </section>

      <div>
        <img
          src={Frame740}
          alt="frame 740 from assets "
          className="pl-27 pr-27"
        />
      </div>

      <div>
        <img src={Frame702} alt="frame 702" className="p-35 pl-60" />
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-6 px-6">
          {/* Exclusive Section */}
          <div>
            <h1 className="text-xl font-bold">Exclusive</h1>
            <h2 className="mt-5">Subscribe</h2>
            <h2>Get 10% off your first order</h2>
          </div>

          {/* Support Section */}
          <div>
            <h1 className="text-xl font-bold">Support</h1>
            <h2 className="mt-5">111 Bijoy Ghazela</h2>
            <h2>exclusive@gmail.com</h2>
            <h2>+216 44411155</h2>
          </div>

          {/* Account Section */}
          <div>
            <h1 className="text-xl font-bold">Account</h1>
            <ul className="mt-5 space-y-2">
              <li>My Account</li>

              <NavLink to="/client/signup">
                <li>Login / Register</li>
              </NavLink>
              <NavLink to="/client/cart">
                <li>Cart</li>
              </NavLink>

              <li>Wishlist</li>

              <NavLink to="/client/products">
                <li>Shop</li>
              </NavLink>
            </ul>
          </div>

          {/* Links Section */}
          <div>
            <ul className="space-y-2">
              <NavLink to="/client/contact">
                <li>Privacy Policy</li>
              </NavLink>

              <NavLink to="/client/contact">
                <li>Terms Of Use</li>
              </NavLink>
              <NavLink to="/client/contact">
                <li>FAQ</li>
              </NavLink>

              <NavLink to="/client/contact">
                <li>Contact</li>
              </NavLink>
            </ul>
          </div>

          {/* Download App Section */}
          <div>
            <h1 className="text-xl font-bold">Download App</h1>
            <img src={Frame719} alt="Play Store" className="mt-5 w-50" />
            <img src={Frame741} alt="" className="mt-10" />
          </div>
        </div>

        {/* Footer Image */}
        <div className="mt-10 text-center">
          <img src={Footer} alt="Footer" className="mx-auto" />
        </div>
      </footer>
    </div>
  );
};

export default Landing;
