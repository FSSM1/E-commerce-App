import React from 'react';

const Landing = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Banner */}
      <section className="container mx-auto my-6 p-4">
        <img src="https://via.placeholder.com/1200x300" alt="Hero Banner" className="w-full rounded" />
      </section>

      {/* Flash Sales */}()
      <section className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Flash Sales</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <img src="https://via.placeholder.com/150" className="w-full" />
            <p className="mt-2">Product Name</p>
            <p className="text-red-500 font-bold">$99.99</p>
          </div>
          {/* Repeat similar divs for more products */}
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Browse By Category</h2>
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded shadow text-center">Category 1</div>
          {/* Repeat for more categories */}
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Best Selling Products</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <img src="https://via.placeholder.com/150" className="w-full" />
            <p className="mt-2">Best Product</p>
            <p className="text-red-500 font-bold">$79.99</p>
          </div>
          {/* Repeat for more products */}
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
