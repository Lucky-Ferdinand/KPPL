import { useState } from "react";
import React from "react";
import "./assets/tailwind.css";
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import Loading from "./components/Loading";

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
import GuestLayout from './layouts/GuestLayout';
import Guest from './pages/guest';

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Job = React.lazy(() => import("./pages/Job"));
const Blog = React.lazy(() => import("./pages/Blog"));
const Company = React.lazy(() => import("./pages/CompanyProfile"));
const Slider = React.lazy(() => import("./pages/Slider"));
const NotFound = React.lazy(() => import("./pages/Notfound"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayouts"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
       <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/job" element={<Job />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/company" element={<Company />} />
          <Route path="/slider" element={<Slider />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        // GuestLayout
        <Route element={<GuestLayout />}>
          <Route path="/guest" element={<Guest />} />
        </Route>

      </Routes>
    </Suspense>
  );
}

export default App;
