import React, { useEffect, useState } from "react";
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
          <Carousel className="ml-20 mr-20"/>
        </div>
      </div>

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

      {/* Category Carousel */}
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Browse By Category
        </h2>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10} // Reduced space between items for better fit
          slidesPerView={6} // Display 6 items per view
          navigation
          autoplay={{ delay: 2500 }}
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
              <div className="flex flex-col items-center p-2 bg-white border border-gray-300 rounded-lg shadow-md">
                <img
                  src={image}
                  alt={`Category ${index}`}
                  className="w-24 h-24 object-contain rounded"
                />{" "}
                {/* Smaller image */}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
      <div>
        <img src={Footer} alt="" />
      </div>
    </div>
  );
};

export default Landing;
