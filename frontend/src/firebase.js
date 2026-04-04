import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC6Nn6CkpHompZhQXraI0CFYrlkh_cWMMs",
  authDomain: "govardhan-shield-ai.firebaseapp.com",
  projectId: "govardhan-shield-ai",
  storageBucket: "govardhan-shield-ai.appspot.com", // ✅ FIXED
  messagingSenderId: "1081828194362",
  appId: "1:1081828194362:web:84f0550c01060612431d03",
  measurementId: "G-V3254HLC9F"
};

const app = initializeApp(firebaseConfig);

// ❌ REMOVE analytics (not needed now)
// const analytics = getAnalytics(app);

// ✅ THIS IS REQUIRED
export const auth = getAuth(app);