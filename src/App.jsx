import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthProvider, useAuth } from "./auth/AuthContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound"; 

function Body() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="container">
        <div className="helper">Loading…</div>
      </div>
    );

  return (
    <>
      <Header />
      <div className="container">
        <Routes> 
          <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" replace />} />
 
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />
 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Body />
      </AuthProvider>
    </Router>
  );
}
