import React from "react";
import { Route, Routes } from "react-router-dom";

// Pages
import Home from "./app/pages/Home";
import PagenotFound from "./app/pages/404/PagenotFound";
import Dashboard from "./app/pages/Admin/Dashboard";
import CreateCategory from "./app/pages/Admin/CreateCategory";
import CreateProduct from "./app/pages/Admin/CreateProduct";

// Routes

//pages
import Login from "./app/pages/Auth/Login/Login";
import Checkout from "./app/pages/Checkout/Checkout";
import ProductDetail from "./app/pages/PDP/ProductDetail";
import Search from "./app/pages/Search/Search";
import Register from "./app/pages/Auth/Register/Register";
import AllProductList from "./app/pages/AllProducts/AllProductList";
import MyOrder from "./app/pages/MyOrders/MyOrder";
import Service from "./app/pages/Services/Service";
import Contact from "./app/pages/Contact/Contact";
import { Cart } from "./app/pages/Cart/Cart";

// routes
import PublicRoute from "./app/components/routes/PublicRoute";
import PrivateRoute from "./app/components/routes/PrivateRoute";
import ResetPassword from "./app/pages/Auth/ForgetPassword/ResetPassword";
import ForgetPasswordLink from "./app/pages/Auth/ForgetPassword/ForgetPasswordLink";
import AdminRoute from "./app/components/routes/AdminRoute";

function App() {
  return (
    <Routes>
      {/* Private routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/YourOrder" element={<MyOrder />} />
        <Route path="/Checkout" element={<Checkout />} />
      </Route>

      {/* Public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* AdminPAnnel Routes */}
      <Route element={<AdminRoute />}>
        <Route path="/dashboard/create-category" element={<CreateCategory />} />
        <Route path="/dashboard/create-product" element={<CreateProduct />} />
      </Route>

      {/* Other routes */}
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Service />} />
      <Route path="/forgetpasswordlink" element={<ForgetPasswordLink />} />
      <Route path="/resetpassword/:token" element={<ResetPassword />} />
      <Route path="/products/:slug" element={<AllProductList />} />
      <Route path="*" element={<PagenotFound />} />
      <Route path="/search" element={<Search />} />
      <Route path="/product-detail/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
