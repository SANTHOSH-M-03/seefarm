import React from "react";

function About() {
  return (
    <div className="bg-green-50 min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
          About us
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            MrSea Farm was established with a vision to provide pure, natural,
            and healthy organic products directly from our farm to your home. We believe
            in sustainable farming practices that respect nature and deliver the best
            quality products.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our farm is located in a pristine environment where our animals roam freely
            and are raised with care and compassion. We don't use any chemicals,
            hormones, or artificial additives in our products.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To promote healthy living by providing 100% natural and organic farm
            products. We are committed to sustainable agriculture and ethical farming
            practices that benefit both our customers and the environment.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-green-600 mb-4">
            Why Choose Us?
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>100% Organic and Natural Products</li>
            <li>No Chemicals or Preservatives</li>
            <li>Grass-fed Cows and Free-range Chickens</li>
            <li>Sustainable and Ethical Farming Practices</li>
            <li>Direct from Farm to Your Home</li>
            <li>Fresh and High-Quality Products</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default About;