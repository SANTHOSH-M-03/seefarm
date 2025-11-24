import React from 'react';
import { Link } from 'react-router-dom';
import chickenImg from '@/assets/Country-chicken.jpg';
const placeholder = "https://via.placeholder.com/300x200/10B981/FFFFFF?text=No+Image";

function ChickenDetail() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Country Chicken</h1>
        <p className="text-2xl font-bold text-green-900 mb-6">₹350 / kg</p>

        <img
          src={chickenImg}
          alt="Country Chicken"
          className="w-full h-96 object-cover rounded-xl shadow-md mb-8"
          onError={(e) => (e.currentTarget.src = placeholder)}
        />

        <p className="text-gray-700 mb-8 leading-relaxed">
          Free-range desi chickens raised the traditional way — roaming open fields, eating grains, insects, and green fodder. 
          No growth promoters, no cages, no stress. Tender, flavorful meat with natural fat marbling. 
          Ideal for curries, biryani, or grilled tandoori.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => alert('Added Country Chicken to cart!')}
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
export default ChickenDetail;