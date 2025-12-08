import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Authprovider";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  if (!currentUser) return <Navigate to="/login" replace />;
  return children;
}
