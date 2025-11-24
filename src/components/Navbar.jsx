import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { CartContext } from "../App";
import Logo from "../assets/Logo.jpeg";

// Helper function to parse price correctly
const parsePrice = (price) => {
  if (typeof price === "number") return price;
  if (typeof price === "string") {
    const numStr = price.replace(/[^0-9.]/g, "");
    const parsed = parseFloat(numStr);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

// Helper function to calculate cart total
const calculateCartTotal = (cart) => {
  if (!cart || cart.length === 0) return "0.00";
  const total = cart.reduce((total, item) => {
    const price = parsePrice(item.price);
    const quantity = item.quantity || 1;
    return total + (price * quantity);
  }, 0);
  return total.toFixed(2);
};

// Helper function to format cart summary
const formatCartSummary = (cart) => {
  if (!cart || cart.length === 0) return "Cart is empty";
  const total = calculateCartTotal(cart);
  const items = cart.map(item => `${item.title} x${item.quantity || 1} - ₹${(parsePrice(item.price) * (item.quantity || 1)).toFixed(2)}`).join('\n');
  return `CART SUMMARY\n\n${items}\n\n─────────────────────\nTOTAL: ₹${total}\n─────────────────────`;
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoModal, setShowLogoModal] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return unsubscribe;
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      setShowAuthModal(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Sign-in error:", error.message);
      alert("Sign-in failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error("Sign-out error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-green-800 to-green-700 text-white shadow-2xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo + Brand Name */}
            <button
              onClick={() => setShowLogoModal(true)}
              className="flex items-center space-x-3 group cursor-pointer bg-none border-none p-0"
            >
              <div className="relative">
                <div className="absolute -inset-1 bg-green-400 rounded-full blur-xl opacity-100 group-hover:opacity-80 animate-pulse"></div>
                <div className="relative h-12 w-12 md:h-14 md:w-14 rounded-full overflow-hidden border-4 border-white shadow-xl transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                  <img
                    src={Logo}
                    alt="Mr.Sea Logo"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full opacity-40 blur-sm"></div>
                </div>
              </div>
              <span className="text-xl md:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-400 drop-shadow-md transform transition-all duration-300 group-hover:-translate-y-1">
                Mr.Sea Farm
              </span>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8 items-center">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/products">Products</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              
              {/* Cart Button */}
              <button
                onClick={() => setShowCartModal(true)}
                className="relative bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold py-2 px-4 rounded-full hover:from-cyan-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                🛒 Cart
                {cartContext?.cart?.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartContext.cart.length}
                  </span>
                )}
              </button>

              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    to="/admin/panel"
                    className="bg-green-500 text-white font-bold py-2 px-6 rounded-full hover:bg-green-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Admin Panel
                  </Link>
                  <button
                    onClick={handleSignOut}
                    disabled={loading}
                    className="bg-red-500 text-white font-bold py-2 px-6 rounded-full hover:bg-red-400 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    Sign Out
                  </button>
                  <div className="flex items-center gap-2 text-sm">
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="text-white">{user.displayName?.split(" ")[0]}</span>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-yellow-400 text-green-800 font-bold py-2 px-6 rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-2xl hover:text-yellow-300 transition-colors"
            >
              ☰
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden mt-4 space-y-3 pb-4 border-t border-green-600 pt-4">
              <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
              <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
              <MobileNavLink to="/products" onClick={() => setIsOpen(false)}>Products</MobileNavLink>
              <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
              {user ? (
                <>
                  <MobileNavLink to="/admin/panel" onClick={() => setIsOpen(false)}>Admin Panel</MobileNavLink>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                    disabled={loading}
                    className="block w-full bg-red-500 text-white font-bold py-2 px-6 rounded-full hover:bg-red-400 transition-all duration-300 shadow-lg text-center disabled:opacity-50"
                  >
                    Sign Out
                  </button>
                  <div className="flex items-center gap-2 px-4 py-2 text-white">
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-8 h-8 rounded-full"
                    />
                    <span>{user.displayName}</span>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsOpen(false);
                  }}
                  className="block w-full bg-yellow-400 text-green-800 font-bold py-2 px-6 rounded-full hover:bg-yellow-300 transition-all duration-300 shadow-lg text-center"
                >
                  Sign In
                </button>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setShowAuthModal(false)}
        >
          <div
            className="relative bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-2xl transition-colors"
            >
              ✕
            </button>

            {/* Title */}
            <h2 className="text-3xl font-bold text-green-800 mb-2 text-center">Welcome</h2>
            <p className="text-gray-600 text-center mb-8">Sign in or create an account</p>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-3 disabled:opacity-50 mb-4"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {loading ? "Signing in..." : "Sign in with Google"}
            </button>

            {/* Info Text */}
            <p className="text-xs text-gray-500 text-center mt-4">
              Sign up is automatic. We'll create your account on first sign-in.
            </p>
          </div>
        </div>
      )}

      {/* Logo Modal */}
      {showLogoModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setShowLogoModal(false)}
        >
          <div
            className="relative bg-white rounded-3xl p-8 shadow-2xl max-w-lg w-full transform transition-all animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowLogoModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl transition-colors"
            >
              ✕
            </button>

            {/* Logo Container */}
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 mb-6">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 to-yellow-300 rounded-full blur-2xl opacity-30 animate-pulse"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-green-600 shadow-2xl">
                  <img
                    src={Logo}
                    alt="Mr.Sea Farm Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-green-700 mb-4 text-center">
                Mr.Sea Farm
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-center text-lg mb-6 leading-relaxed">
                Pure, Organic, and Natural Products from Farm to Home
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 w-full mb-6">
                <FeatureItem icon="🌱" text="100% Organic" />
                <FeatureItem icon="🚜" text="Sustainable" />
                <FeatureItem icon="🏡" text="Farm Fresh" />
                <FeatureItem icon="💚" text="Natural" />
              </div>

              {/* Close Button at Bottom */}
              <button
                onClick={() => setShowLogoModal(false)}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-96 flex flex-col">
              {/* Cart Header */}
              <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white p-6 flex justify-between items-center rounded-t-xl">
                <h2 className="text-3xl font-bold">🛒 Shopping Cart</h2>
                <button
                  onClick={() => setShowCartModal(false)}
                  className="text-2xl hover:bg-teal-600 p-2 rounded-lg transition"
                >
                  ✕
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {!cartContext?.cart || cartContext.cart.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-3xl mb-4">🛍️</p>
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartContext.cart.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 hover:border-teal-300 transition">
                        <div className="flex gap-4 items-start">
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                            <p className="text-teal-600 font-semibold text-lg">₹{parsePrice(item.price).toFixed(2)} x {item.quantity || 1}</p>
                            <p className="text-lg font-bold text-gray-900">Subtotal: ₹{(parsePrice(item.price) * (item.quantity || 1)).toFixed(2)}</p>
                            <p className="text-sm text-gray-600 mt-1">{item.category}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => cartContext.updateCartQuantity(item.id, (item.quantity || 1) - 1)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            >
                              −
                            </button>
                            <span className="px-4 font-semibold text-lg">{item.quantity || 1}</span>
                            <button
                              onClick={() => cartContext.updateCartQuantity(item.id, (item.quantity || 1) + 1)}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                            >
                              +
                            </button>
                            <button
                              onClick={() => cartContext.removeFromCart(item.id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded ml-2"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              {cartContext?.cart && cartContext.cart.length > 0 && (
                <div className="border-t-2 border-gray-200 p-6 bg-gray-50 rounded-b-xl">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-2xl font-bold text-teal-600">
                      ₹{calculateCartTotal(cartContext.cart)}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        cartContext.clearCart();
                        setShowCartModal(false);
                      }}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
                    >
                      Clear Cart
                    </button>
                    <button
                      onClick={() => {
                        alert(formatCartSummary(cartContext.cart));
                      }}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
                    >
                      View Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function FeatureItem({ icon, text }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-2xl mb-1">{icon}</span>
      <span className="text-xs font-semibold text-gray-700">{text}</span>
    </div>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-lg font-medium hover:text-yellow-300 transition-all duration-300 hover:scale-110 hover:-translate-y-1 relative group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-1 bg-yellow-400 rounded-full group-hover:w-full transition-all duration-300"></span>
    </Link>
  );
}

function MobileNavLink({ to, onClick, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="block text-lg font-medium hover:text-yellow-300 hover:pl-2 transition-all duration-300 py-2"
    >
      {children}
    </Link>
  );
}

export default Navbar;