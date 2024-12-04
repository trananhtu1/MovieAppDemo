import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cấu hình Firebase của bạn
const firebaseConfig = {
  apiKey: "AIzaSyBdZhPhjI7-9wBNKTNykuM3im4KDV8BdfY",
  authDomain: "movie-app-login-e6161.firebaseapp.com",
  projectId: "movie-app-login-e6161",
  storageBucket: "movie-app-login-e6161.appspot.com",
  messagingSenderId: "140135156183",
  appId: "1:140135156183:web:0ffc19800d98a5c123e392",
  measurementId: "G-BSDDEB182S"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Auth với AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth };