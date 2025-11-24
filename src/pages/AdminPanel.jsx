import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database } from '../firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { ref, push, update, remove, onValue, query, orderByChild } from 'firebase/database';

const ADMIN_EMAIL = 'mrseafarm@gmail.com';

function AdminPanel() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    desc: '',
    category: '',
    imageUrl: '',
    stock: '',
    quantity: '',
    unit: 'litre',
    featured: false,
  });
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [activeTab, setActiveTab] = useState('list');
  const [connectionError, setConnectionError] = useState(null);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('adminCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showCart, setShowCart] = useState(false);

  // Cart functions
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
    localStorage.setItem('adminCart', JSON.stringify(updatedCart));
    setSuccessMessage(`✅ ${product.title} added to cart!`);
    setTimeout(() => setSuccessMessage(''), 2000);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('adminCart', JSON.stringify(updatedCart));
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      const updatedCart = cart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      setCart(updatedCart);
      localStorage.setItem('adminCart', JSON.stringify(updatedCart));
    }
  };

  const clearCart = () => {
    if (window.confirm('Are you sure you want to clear the cart?')) {
      setCart([]);
      localStorage.removeItem('adminCart');
      setShowCart(false);
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price?.replace(/[^0-9.]/g, '') || 0);
      return total + (price * (item.quantity || 1));
    }, 0);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && currentUser.email === ADMIN_EMAIL) {
        setUser(currentUser);
        console.log('✅ Admin authenticated:', currentUser.uid);
        setLoading(false);
      } else {
        console.warn('❌ Not authorized. Current user:', currentUser?.email);
        navigate('/admin/auth');
      }
    });

    return unsubscribe;
  }, [navigate]);

  // Fetch products from Firebase with real-time updates
  useEffect(() => {
    if (!database) {
      setConnectionError('⚠️ Database connection not available');
      console.error('❌ Database not initialized');
      return;
    }

    try {
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
            setConnectionError(null); // Clear error on success
          } else {
            setProducts([]);
            setConnectionError(null);
          }
        },
        (error) => {
          console.error('❌ Error fetching products:', error.code, error.message);
          setConnectionError(`⚠️ Connection Error: ${error.message}`);
          
          if (error.code === 'PERMISSION_DENIED') {
            setConnectionError('❌ Permission Denied: Check Firebase Rules and admin setup');
          } else if (error.code === 'NETWORK_ERROR') {
            setConnectionError('⚠️ Network Error: Check your internet connection');
          }
        }
      );

      return unsubscribe;
    } catch (error) {
      console.error('❌ Error setting up database listener:', error);
      setConnectionError(`⚠️ Setup Error: ${error.message}`);
    }
  }, []);

  // Apply filters and search in real-time
  useEffect(() => {
    let filtered = products;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.desc.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filterCategory) {
      filtered = filtered.filter((product) => product.category === filterCategory);
    }

    // Sort
    if (sortBy === 'latest') {
      filtered.sort((a, b) => new Date(b.createdAt || b.updatedAt) - new Date(a.createdAt || a.updatedAt));
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt || a.updatedAt) - new Date(b.createdAt || b.updatedAt));
    } else if (sortBy === 'a-z') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'z-a') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, filterCategory, sortBy]);

  const handleImageUpload = async (file) => {
    if (!file) return null;

    setUploading(true);
    try {
      const cloudName = import.meta.env.VITE_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET || 'mrseafarm';

      if (!cloudName) {
        console.warn('⚠️ Cloudinary cloud name not configured. Using local storage.');
        return URL.createObjectURL(file);
      }

      const formDataObj = new FormData();
      formDataObj.append('file', file);
      formDataObj.append('upload_preset', uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formDataObj,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Cloudinary error response:', errorData);
        throw new Error(errorData.error?.message || 'Upload failed');
      }

      const data = await response.json();
      if (data.secure_url) {
        console.log('✅ Image uploaded successfully:', data.secure_url);
        return data.secure_url;
      } else {
        throw new Error('No secure URL returned from Cloudinary');
      }
    } catch (error) {
      console.error('❌ Image upload error:', error.message);
      alert(`Image upload failed: ${error.message}`);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.price || !formData.desc || !formData.category) {
      alert('Please fill all required fields');
      return;
    }

    let imageUrl = formData.imageUrl;
    if (imageFile) {
      imageUrl = await handleImageUpload(imageFile);
      if (!imageUrl) {
        console.error('Image upload returned null');
        return;
      }
    } else if (editingId && !formData.imageUrl) {
      alert('Please provide an image for the product');
      return;
    }

    const now = new Date().toISOString();
    const productData = {
      title: formData.title.trim(),
      price: formData.price.trim(),
      desc: formData.desc.trim(),
      category: formData.category,
      imageUrl: imageUrl || '',
      stock: formData.stock ? parseInt(formData.stock, 10) : 0,
      quantity: formData.quantity || '',
      unit: formData.unit || 'litre',
      featured: formData.featured === true,
      updatedAt: now,
    };

    try {
      if (!database) {
        throw new Error('Database connection not available');
      }

      if (editingId) {
        // Update existing product - keep createdAt
        const productRef = ref(database, `products/${editingId}`);
        await update(productRef, productData);
        setSuccessMessage('✅ Product updated successfully!');
        console.log('✅ Product updated:', editingId);
      } else {
        // Add new product with metadata
        const productsRef = ref(database, 'products');
        const newProductData = {
          ...productData,
          createdAt: now,
        };
        const result = await push(productsRef, newProductData);
        console.log('✅ Product added with ID:', result.key);
        setSuccessMessage('✅ Product added successfully!');
      }

      setConnectionError(null); // Clear any previous errors

      // Reset form
      setFormData({
        title: '',
        price: '',
        desc: '',
        category: '',
        imageUrl: '',
        stock: '',
        quantity: '',
        unit: 'litre',
        featured: false,
      });
      setImageFile(null);
      setEditingId(null);
      setActiveTab('list');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('❌ Submit error:', error);
      console.error('Error code:', error.code);
      console.error('Error message:', error.message);
      
      let userMessage = error.message;
      
      if (error.code === 'PERMISSION_DENIED') {
        userMessage = '❌ Permission Denied: You don\'t have permission to write to the database. Ensure you\'re logged in as admin and added to the admins node.';
      } else if (error.message.includes('403') || error.message.includes('Forbidden')) {
        userMessage = '❌ Access Forbidden (403): Your admin setup may be incomplete. Check Firebase Rules and verify admin entry in database.';
      } else if (error.message.includes('Network')) {
        userMessage = '⚠️ Network Error: Check your internet connection and try again.';
      } else if (error.message.includes('OpaqueResponseBlocking')) {
        userMessage = '⚠️ CORS/Network Error: This may be a temporary issue. Refresh the page and try again.';
      }
      
      setConnectionError(userMessage);
      setSuccessMessage(userMessage);
      setTimeout(() => setSuccessMessage(''), 5000);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      title: product.title,
      price: product.price,
      desc: product.desc,
      category: product.category,
      imageUrl: product.imageUrl,
      stock: product.stock || '',
      quantity: product.quantity || '',
      unit: product.unit || 'litre',
      featured: product.featured || false,
    });
    setEditingId(product.id);
    setActiveTab('form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const productRef = ref(database, `products/${id}`);
        await remove(productRef);
        setSuccessMessage('✅ Product deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setSuccessMessage(`❌ Error: ${error.message}`);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin/auth');
    } catch (error) {
      alert(`Logout failed: ${error.message}`);
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      price: '',
      desc: '',
      category: '',
      imageUrl: '',
      stock: '',
      featured: false,
    });
    setImageFile(null);
    setEditingId(null);
    setActiveTab('list');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          <p className="text-gray-600 mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-white shadow-xl rounded-lg px-6 py-4 border-l-4 border-green-500 z-50 animate-pulse">
          <p className="text-green-700 font-semibold">{successMessage}</p>
        </div>
      )}

      {/* Header */}
      <nav className="bg-gradient-to-r from-green-800 to-green-700 text-white shadow-2xl sticky top-0 z-40 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold">🌾 Mr.Sea Farm Admin</h1>
            <p className="text-green-100 text-sm mt-1">Welcome, <span className="font-semibold">{user?.displayName || user?.email}</span></p>
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => navigate('/')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🏠 Home
            </button>
            <button
              onClick={() => setShowCart(!showCart)}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105 relative"
            >
              🛒 Cart <span className="bg-red-600 text-white text-xs rounded-full px-2 py-1 ml-2 absolute -top-2 -right-2">{cart.length}</span>
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Connection Error Alert */}
      {connectionError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{connectionError}</p>
              <p className="text-xs text-red-600 mt-1">
                💡 Tip: Check your browser console (F12 → Console) for more details. Try refreshing the page.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
          <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-96 flex flex-col">
              {/* Cart Header */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 flex justify-between items-center rounded-t-xl">
                <h2 className="text-3xl font-bold">🛒 Shopping Cart</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-2xl hover:bg-purple-600 p-2 rounded-lg transition"
                >
                  ✕
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-3xl mb-4">🛍️</p>
                    <p className="text-gray-500 text-lg">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200 hover:border-purple-300 transition">
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
                            <p className="text-purple-600 font-semibold text-lg">{item.price}</p>
                            <p className="text-sm text-gray-600 mt-1">{item.category}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateCartQuantity(item.id, (item.quantity || 1) - 1)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                            >
                              −
                            </button>
                            <span className="px-4 font-semibold text-lg">{item.quantity || 1}</span>
                            <button
                              onClick={() => updateCartQuantity(item.id, (item.quantity || 1) + 1)}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                            >
                              +
                            </button>
                            <button
                              onClick={() => removeFromCart(item.id)}
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
              {cart.length > 0 && (
                <div className="border-t-2 border-gray-200 p-6 bg-gray-50 rounded-b-xl">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">Total:</span>
                    <span className="text-2xl font-bold text-purple-600">₹{getCartTotal().toFixed(2)}</span>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={clearCart}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
                    >
                      Clear Cart
                    </button>
                    <button
                      onClick={() => {
                        alert(`Cart Total: ₹${getCartTotal().toFixed(2)}\n\n${cart.map(item => `${item.title} x${item.quantity || 1}`).join('\n')}`);
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

      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-shadow">
            <h3 className="text-gray-600 text-sm font-semibold">Total Products</h3>
            <p className="text-4xl font-bold text-green-700 mt-2">{products.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
            <h3 className="text-gray-600 text-sm font-semibold">Filtered Results</h3>
            <p className="text-4xl font-bold text-blue-700 mt-2">{filteredProducts.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
            <h3 className="text-gray-600 text-sm font-semibold">Status</h3>
            <p className="text-xl font-bold text-purple-700 mt-2">🟢 Live</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500 hover:shadow-xl transition-shadow">
            <h3 className="text-gray-600 text-sm font-semibold">Last Updated</h3>
            <p className="text-lg font-bold text-yellow-700 mt-2">Real-time</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-2xl p-8 sticky top-24 h-fit">
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                {editingId ? '✏️ Edit Product' : '➕ Add New Product'}
              </h2>
              <p className="text-gray-600 text-sm mb-6">Fill in the details below</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., Organic Milk"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Price <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g., ₹60 / liter"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Dairy">🥛 Dairy</option>
                    <option value="Poultry">🐔 Poultry</option>
                    <option value="Fertilizer">🌱 Fertilizer</option>
                    <option value="Other">🛒 Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="desc"
                    value={formData.desc}
                    onChange={handleInputChange}
                    placeholder="Describe your product in detail"
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors resize-none"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Stock Level
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    placeholder="e.g., 100"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      placeholder="e.g., 1, 5, 10"
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Unit
                    </label>
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                    >
                      <option value="litre">📦 Litre</option>
                      <option value="kilogram">⚖️ Kilogram</option>
                      <option value="gram">⚖️ Gram</option>
                      <option value="piece">🔢 Piece</option>
                      <option value="dozen">🔢 Dozen</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-5 h-5 accent-green-600 cursor-pointer"
                  />
                  <label htmlFor="featured" className="text-sm font-semibold text-gray-700 cursor-pointer">
                    ⭐ Mark as Featured
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Product Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                  />
                  {formData.imageUrl && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-600 mb-2">Preview:</p>
                      <img src={formData.imageUrl} alt="Preview" className="h-32 w-full object-cover rounded-lg shadow-md" />
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50 transform hover:scale-105"
                  >
                    {uploading ? '⏳ Uploading...' : editingId ? '💾 Update' : '➕ Add'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      ✕ Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Products List Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-2xl p-8">
              {/* Filters and Search */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-green-800 mb-6">
                  📦 Products <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-lg ml-2">{filteredProducts.length}/{products.length}</span>
                </h2>

                <div className="space-y-4">
                  {/* Search Bar */}
                  <div>
                    <input
                      type="text"
                      placeholder="🔍 Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Filters */}
                  <div className="grid grid-cols-2 gap-4">
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors text-sm"
                    >
                      <option value="">All Categories</option>
                      <option value="Dairy">🥛 Dairy</option>
                      <option value="Poultry">🐔 Poultry</option>
                      <option value="Fertilizer">🌱 Fertilizer</option>
                      <option value="Other">🛒 Other</option>
                    </select>

                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors text-sm"
                    >
                      <option value="latest">Latest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="a-z">A - Z</option>
                      <option value="z-a">Z - A</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Products Display */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-5xl mb-4">{searchTerm || filterCategory ? '🔍' : '🌾'}</p>
                  <p className="text-gray-500 text-lg font-semibold">
                    {searchTerm || filterCategory ? 'No matching products' : 'No products yet'}
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    {searchTerm || filterCategory ? 'Try adjusting your search or filters' : 'Add your first product using the form on the left'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4 max-h-screen overflow-y-auto">
                  {filteredProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className="bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl p-5 hover:shadow-xl transition-all hover:border-green-300 transform hover:scale-102"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">#{index + 1}</span>
                            <span className="text-xs text-gray-400">ID: {product.id.slice(0, 8)}...</span>
                          </div>
                          <h3 className="text-lg font-bold text-green-700">{product.title}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{product.category}</span>
                            {product.featured && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">⭐ Featured</span>}
                          </div>
                          <p className="text-2xl font-bold text-green-900 mt-2">{product.price}</p>
                          {product.quantity && product.unit && (
                            <p className="text-sm font-semibold text-teal-600 mt-1">📏 {product.quantity} {product.unit}</p>
                          )}
                          {product.stock && <p className="text-xs text-gray-600 mt-1">📦 Stock: {product.stock}</p>}
                          <p className="text-sm text-gray-700 mt-2 line-clamp-2">{product.desc}</p>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          {product.imageUrl && (
                            <img
                              src={product.imageUrl}
                              alt={product.title}
                              className="h-24 w-24 object-cover rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            />
                          )}
                          <button
                            onClick={() => handleEdit(product)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all shadow-md hover:shadow-lg w-full transform hover:scale-105"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => addToCart(product)}
                            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all shadow-md hover:shadow-lg w-full transform hover:scale-105"
                          >
                            🛒 Add to Cart
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all shadow-md hover:shadow-lg w-full transform hover:scale-105"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
