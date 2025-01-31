import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Carousel from "../../components/Carousel";
import CategoryCarousel from "../../components/CategoryCarousel";

const Landing = () => {

  

  const [productsData, setProductsData] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:3000/api/products/getAll");
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
        <img src="https://via.placeholder.com/1200x300" alt="Hero Banner" className="w-full rounded" />
      </section>
      <Carousel/>

      

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
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded" />
                <p className="mt-2 font-bold">{product.name}</p>
                <p className="text-red-500 font-bold">${product.price}</p>
                <p className="text-gray-400 line-through">${product.originalPrice || product.price * 1.2}</p>
                <button className="mt-2 bg-black text-white px-4 py-2 rounded">Add to Cart</button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>



      {/* Categories */}
     
      <CategoryCarousel />

      {/* Flash Sales */}()
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

      

      {/* Promotional Banner */}
      <section className="container mx-auto my-6 p-4">
        <img src="https://via.placeholder.com/1200x200" alt="Promo Banner" className="w-full rounded" />
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
