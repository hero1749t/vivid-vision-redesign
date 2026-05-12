// Firebase Configuration
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
  Auth,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if Firebase is properly configured
const isFirebaseConfigured = () => {
  return (
    firebaseConfig.apiKey &&
    firebaseConfig.apiKey !== "demo-api-key" &&
    firebaseConfig.apiKey !== undefined
  );
};

// Initialize Firebase only once
let app: FirebaseApp | null = null;
let auth: Auth | null = null;

if (typeof window !== "undefined" && isFirebaseConfigured()) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  auth = getAuth(app);
}

// Demo users for testing (only used when Firebase is not configured)
export const TEST_USERS = [
  { email: "admin@baliyttc.com", password: "admin123", role: "SUPER_ADMIN", name: "Admin User" },
  { email: "student@test.com", password: "student123", role: "STUDENT", name: "Test Student" },
  { email: "teacher@test.com", password: "teacher123", role: "TEACHER", name: "Test Teacher" },
];

// Auth functions
export async function loginWithEmail(email: string, password: string) {
  // Demo mode - check against test users
  if (!isFirebaseConfigured()) {
    const testUser = TEST_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (testUser) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        user: {
          uid: email,
          email: testUser.email,
          displayName: testUser.name,
        },
        role: testUser.role,
      };
    }
    throw new Error("Invalid credentials");
  }

  // Real Firebase auth
  if (!auth) throw new Error("Auth not initialized");
  const result = await signInWithEmailAndPassword(auth, email, password);
  return { user: result.user };
}

export async function registerWithEmail(email: string, password: string, name: string) {
  // Demo mode
  if (!isFirebaseConfigured()) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return {
      user: {
        uid: email,
        email,
        displayName: name,
      },
      role: "STUDENT",
    };
  }

  if (!auth) throw new Error("Auth not initialized");
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName: name });
  return { user: result.user };
}

export async function logout() {
  if (!isFirebaseConfigured()) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return;
  }

  if (!auth) throw new Error("Auth not initialized");
  await signOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  if (!auth) {
    // Demo mode - check localStorage
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("baliyttc_user");
      if (stored) {
        callback(JSON.parse(stored).user);
        return () => {};
      }
    }
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

// Demo auth helpers
export function setDemoUser(user: { uid: string; email: string; displayName: string }, role: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("baliyttc_user", JSON.stringify({ user, role }));
  }
}

export function getDemoUser() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("baliyttc_user");
    if (stored) {
      return JSON.parse(stored);
    }
  }
  return null;
}

export function clearDemoUser() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("baliyttc_user");
  }
}

export { auth, app, isFirebaseConfigured };
