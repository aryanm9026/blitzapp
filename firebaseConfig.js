// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyDzHJSPuqUzSy-Kj9ufbiCcTAoozlJQ8s8",
  authDomain: "splitzy-fec2a.firebaseapp.com",
  projectId: "splitzy-fec2a",
  storageBucket: "splitzy-fec2a.firebasestorage.app",
  messagingSenderId: "337376398757",
  appId: "1:337376398757:web:54465a64e5f7813dff2c4c",
  measurementId: "G-JQTBZ49CF1"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
