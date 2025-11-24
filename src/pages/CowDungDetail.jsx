import React from 'react';
import { Link } from 'react-router-dom';
import cowdungImg from '@/assets/Cowdung.jpg';
const placeholder = "https://via.placeholder.com/300x200/10B981/FFFFFF?text=No+Image";

function CowDungDetail() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Organic Cow Dung</h1>
        <p className="text-2xl font-bold text-green-900 mb-6">₹150 / 25kg bag</p>

        <img
          src={cowdungImg}
          alt="Organic Cow Dung"
          className="w-full h-96 object-cover rounded-xl shadow-md mb-8"
          onError={(e) => (e.currentTarget.src = placeholder)}
        />

        <p className="text-gray-700 mb-8 leading-relaxed">
          100% natural, sun-dried cow dung from our healthy, grass-fed cows. 
          Rich in nitrogen, phosphorus & beneficial microbes — the perfect organic fertilizer for your garden or farm. 
          Also used as eco-friendly fuel for traditional chulhas and in pooja rituals. 
          Comes in convenient 25 kg bags.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => alert('Added Organic Cow Dung to cart!')}
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
export default CowDungDetail;