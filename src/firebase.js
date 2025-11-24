import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { getStorage } from 'firebase/storage';

// Replace with your Firebase config
const firebaseConfig = {

  apiKey: "AIzaSyDhK8RlGRiORre2rwCl2THZz5TeDWMnu9E",

  authDomain: "miniproject-26a9a.firebaseapp.com",

  databaseURL: "https://miniproject-26a9a-default-rtdb.firebaseio.com",

  projectId: "miniproject-26a9a",

  storageBucket: "miniproject-26a9a.firebasestorage.app",

  messagingSenderId: "800447177164",

  appId: "1:800447177164:web:93bbc5ac1ad453b27a7d69",

  measurementId: "G-KYFKH6BST7"

};


// Validate Firebase configuration
const isConfigValid = Object.values(firebaseConfig).every(value => 
  value && typeof value === 'string' && !value.startsWith('YOUR_')
);

if (!isConfigValid) {
  console.warn('⚠️ Firebase configuration is incomplete. Please add your Firebase credentials to .env.local file.');
  console.warn('Expected environment variables:', Object.keys(firebaseConfig).map(key => `VITE_${key}`).join(', '));
}

// Initialize Firebase
let app;
let auth;
let googleProvider;
let database;
let storage;

try {
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase initialized successfully');
  
  // Initialize Firebase Authentication and get a reference to the service
  auth = getAuth(app);
  googleProvider = new GoogleAuthProvider();
  
  // Initialize Realtime Database (only if databaseURL is valid)
  if (firebaseConfig.databaseURL && firebaseConfig.databaseURL.includes('firebaseio.com')) {
    database = getDatabase(app);
    console.log('✅ Firebase Realtime Database connected');
    console.log('📡 Database URL:', firebaseConfig.databaseURL);
    
    // Auto-register admin when user logs in
    onAuthStateChanged(auth, async (user) => {
      if (user && user.email === 'mrseafarm@gmail.com') {
        try {
          const adminRef = ref(database, `admins/${user.uid}`);
          await set(adminRef, {
            email: user.email,
            role: 'admin',
            registeredAt: new Date().toISOString(),
            uid: user.uid
          });
          console.log('✅ Admin registered in database:', user.uid);
        } catch (error) {
          console.warn('⚠️ Could not auto-register admin:', error.message);
        }
      }
    });
  } else {
    console.warn('⚠️ Firebase Realtime Database URL not configured');
    console.warn('Current databaseURL:', firebaseConfig.databaseURL);
  }
  
  // Initialize Storage
  storage = getStorage(app);
  console.log('✅ Firebase Storage initialized');
  
  // Log connection info
  console.log('📊 Firebase Project:', firebaseConfig.projectId);
  console.log('🔐 Auth Domain:', firebaseConfig.authDomain);
  console.log('✅ Storage Bucket:', firebaseConfig.storageBucket);
} catch (error) {
  console.error('❌ Firebase initialization error:', error.message);
  console.error('Please ensure all Firebase credentials are correctly set in .env file');
  console.error('Full error:', error);
}

export { auth, googleProvider, database, storage };

export default app;
