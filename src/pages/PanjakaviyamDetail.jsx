import React from 'react';
import { Link } from 'react-router-dom';
import panjakaviyamImg from '../assets/Panjakaviyam.jpg';
const placeholder = "https://via.placeholder.com/300x200/10B981/FFFFFF?text=No+Image";

function PanjakaviyamDetail() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Panjakaviyam</h1>
        <p className="text-2xl font-bold text-green-900 mb-6">₹250 / 500g</p>

        <img
          src={panjakaviyamImg}
          alt="Panjakaviyam"
          className="w-full h-96 object-cover rounded-xl shadow-md mb-8"
          onError={(e) => (e.currentTarget.src = placeholder)}
        />

        <p className="text-gray-700 mb-8 leading-relaxed">
          An ancient Tamil Siddha recipe made from 5 sacred ingredients: Cow milk, curd, ghee, dung, & urine — all sourced from our native cows. 
          Naturally fermented for 21 days to boost immunity, improve digestion, and purify the body. 
          Used in daily rituals, as a health tonic, or for Panchagavya therapy.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => alert('Added Panjakaviyam to cart!')}
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
export default PanjakaviyamDetail;