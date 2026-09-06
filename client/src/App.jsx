import { BrowserRouter, Route, Routes } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import HomePage from "./pages/HomePage";
import Navbar from "./common/Navbar";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./common/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          {/* Public routes */}
          <Route
            path="/"
            element={<LandingPage />}
          />

          <Route
            path="/auth"
            element={<Auth />}
          />
          
          <Route
            path="/reset-password/:token"
            element={<ResetPassword />}
          />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              path="/profile"
              element={<Profile />}
            />
          
            <Route
              path="/dashboard"
              element={<HomePage />}
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;