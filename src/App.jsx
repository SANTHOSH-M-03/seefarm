import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Products from './pages/Products';
import MilkDetail from './pages/MilkDetail';
import ChickenDetail from './pages/ChickenDetail';
import CowDungDetail from './pages/CowDungDetail';
import PanjakaviyamDetail from './pages/PanjakaviyamDetail';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminAuth from './pages/AdminAuth';
import AdminPanel from './pages/AdminPanel';

// Create Cart Context
export const CartContext = React.createContext();

function AppContent() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('websiteCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('websiteCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    let updatedCart;
    
    if (existingItem) {
      updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    
    setCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartValue = { cart, addToCart, removeFromCart, updateCartQuantity, clearCart };

  return (
    <CartContext.Provider value={cartValue}>
      <Routes>
        {/* Admin Routes - No Navbar/Footer */}
        <Route path="/admin/auth" element={<AdminAuth />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/panel" element={<AdminPanel />} />

        {/* Public Routes - With Navbar/Footer */}
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/milk" element={<MilkDetail />} />
                <Route path="/products/chicken" element={<ChickenDetail />} />
                <Route path="/products/cowdung" element={<CowDungDetail />} />
                <Route path="/cowdung-detail" element={<CowDungDetail />} />
                <Route path="/products/panjakaviyam" element={<PanjakaviyamDetail />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </CartContext.Provider>
  );
}

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </Router>
  );
}

export default App;