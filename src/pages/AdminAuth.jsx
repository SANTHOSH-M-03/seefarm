import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const ADMIN_EMAIL = 'mrseafarm@gmail.com';

function AdminAuth() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(false);
      if (currentUser && currentUser.email === ADMIN_EMAIL) {
        setUser(currentUser);
        // Redirect to admin panel after successful auth
        setTimeout(() => navigate('/admin/panel'), 500);
      } else if (currentUser) {
        setError(`Access Denied! Only ${ADMIN_EMAIL} can access the admin panel.`);
        signOut(auth);
      }
    });

    return unsubscribe;
  }, [navigate]);

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      
      if (result.user.email !== ADMIN_EMAIL) {
        setError(`Access Denied! Only ${ADMIN_EMAIL} can access the admin panel.`);
        await signOut(auth);
        setLoading(false);
        return;
      }
      
      setUser(result.user);
    } catch (err) {
      setError(`Login failed: ${err.message}`);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-800 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          <p className="text-white mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 flex items-center justify-center px-6 py-12">
      <div className="bg-white rounded-2xl shadow-2xl p-12 w-full max-w-md">
        <h1 className="text-4xl font-bold text-green-800 mb-2 text-center">Admin Panel</h1>
        <p className="text-gray-600 text-center mb-8">Manage your farm products</p>

        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-green-900 font-bold py-3 px-6 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 10c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
            </svg>
            Sign in with Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Only {ADMIN_EMAIL} allowed</span>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <p className="text-sm text-green-700">
              <span className="font-semibold">Note:</span> Make sure you're using the official admin email address to access this panel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAuth;
