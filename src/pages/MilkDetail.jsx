import React from 'react';
import { Link } from 'react-router-dom';
import milkImg from '@/assets/Milk.png';
const placeholder = "https://via.placeholder.com/300x200/10B981/FFFFFF?text=No+Image";

function MilkDetail() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Fresh Organic Milk</h1>
        <p className="text-2xl font-bold text-green-900 mb-6">₹80 / liter</p>

        <img
          src={milkImg}
          alt="Fresh Organic Milk"
          className="w-full h-96 object-cover rounded-xl shadow-md mb-8"
          onError={(e) => (e.currentTarget.src = placeholder)}
        />

        <p className="text-gray-700 mb-8 leading-relaxed">
          Pure A2 milk from grass-fed desi cows, raised on our own chemical-free pastures. 
          No hormones, no antibiotics, no preservatives — just the creamy, nutrient-rich taste of real farm milk. 
          Delivered fresh within hours of milking. Perfect for tea, coffee, or straight from the bottle!
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => alert('Added Fresh Organic Milk to cart!')}
            className="bg-yellow-500 text-green-900 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-400 transition-all"
          >
            Add to Cart
          </button>
          <Link
            to="/products"
            className="bg-green-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition-all"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}
export default MilkDetail;