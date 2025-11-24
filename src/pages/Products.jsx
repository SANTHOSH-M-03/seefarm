import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { database } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { CartContext } from '../App';

// === IMAGES ===
import milkImg from '../assets/Milk.png';
import chickenImg from '../assets/Country-chicken.jpg';
import cowdungImg from '../assets/Cowdung.jpg';
import panjakaviyamImg from '../assets/Panjakaviyam.jpg';

const placeholder = 'https://via.placeholder.com/300x200/10B981/FFFFFF?text=No+Image';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null); // For modal

  useEffect(() => {
    const productsRef = ref(database, 'products');
    const unsubscribe = onValue(
      productsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const productsList = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...value,
          }));
          setProducts(productsList);
        } else {
          setProducts([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-green-800 mb-4 drop-shadow-md">
          Our Organic Products
        </h1>
        <p className="text-center text-green-600 mb-12">
          • Fresh • Natural • Directly from Farm
        </p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <p className="text-gray-600 mt-4">Loading products...</p>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-xl">No products available yet.</p>
            <p className="text-gray-500">Check back soon for our fresh, organic products!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  placeholder={placeholder}
                  onLearnMore={() => openModal(product)}
                />
              ))}
            </div>

            <div className="text-center mt-8 p-6 bg-green-50 rounded-xl">
              <p className="text-green-700 font-semibold">
                Showing {products.length} fresh products from our farm
              </p>
            </div>
          </>
        )}

        {/* Back to Home */}
        <div className="text-center mt-16">
          <Link
            to="/"
            className="inline-block bg-green-700 hover:bg-green-600 text-white font-bold py-3 px-10 rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Detailed Product Modal */}
      {selectedProduct && (
        <ProductDetailModal product={selectedProduct} onClose={closeModal} placeholder={placeholder} />
      )}
    </div>
  );
}

// === Product Card with Learn More ===
function ProductCard({ product, placeholder, onLearnMore }) {
  const cartContext = useContext(CartContext);
  const [addedMessage, setAddedMessage] = useState(false);

  const handleAddToCart = () => {
    cartContext?.addToCart(product);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 border border-green-100 flex flex-col h-full">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl || placeholder}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => (e.currentTarget.src = placeholder)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-green-700 flex-1">{product.title}</h3>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded whitespace-nowrap ml-2">
              {product.category}
            </span>
          </div>
          <p className="text-2xl font-bold text-green-900 mb-2">{product.price}</p>
          {product.quantity && product.unit && (
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-2 mb-3 inline-block">
              <p className="text-sm font-bold text-teal-700">Quantity: {product.quantity} {product.unit}</p>
            </div>
          )}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.desc}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleAddToCart}
            className="flex-1 relative overflow-hidden bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 before:absolute before:inset-0 before:bg-white/30 before:rounded-lg before:transition-transform before:duration-500 before:translate-x-[-100%] hover:before:translate-x-[100%]"
          >
            {addedMessage ? '✅ Added!' : '🛒 Add to Cart'}
          </button>
          <button
            onClick={onLearnMore}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

// === Detailed Product Modal ===
function ProductDetailModal({ product, onClose, placeholder }) {
  const cartContext = useContext(CartContext);
  const [addedMessage, setAddedMessage] = useState(false);

  const handleAddToCart = () => {
    cartContext?.addToCart(product);
    setAddedMessage(true);
    setTimeout(() => setAddedMessage(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-scaleIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-gray-700 hover:text-red-600 rounded-full p-2 shadow-lg transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Large Image */}
          <div className="relative overflow-hidden bg-gray-100">
            <img
              src={product.imageUrl || placeholder}
              alt={product.title}
              className="w-full h-96 object-cover"
              onError={(e) => (e.currentTarget.src = placeholder)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <span className="bg-green-600/80 px-3 py-1 rounded-full text-sm font-semibold">
                {product.category}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="p-8 md:p-10 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-3">{product.title}</h2>
              <p className="text-3xl font-bold text-green-900 mb-4">{product.price}</p>

              {product.quantity && product.unit && (
                <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6 inline-block">
                  <p className="text-lg font-bold text-teal-700">
                    Available: {product.quantity} {product.unit}
                  </p>
                </div>
              )}

              <div className="text-gray-700 text-lg leading-relaxed mb-8">
                <p>{product.desc || 'Pure, organic, and fresh from our farm to your home. No chemicals, no preservatives — just nature at its best.'}</p>
              </div>

              <div className="space-y-3 text-sm text-gray-600">
                <p>✓ 100% Organic Certified</p>
                <p>✓ Farm Fresh Daily</p>
                <p>✓ Chemical-Free & Natural</p>
                <p>✓ Directly from Local Farmers</p>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-cyan-500 to-teal-600 hover:from-cyan-600 hover:to-teal-700 text-white font-bold text-xl py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                {addedMessage ? '✅ Added to Cart!' : '🛒 Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;