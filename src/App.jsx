import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";
import Catalog from "./Pages/Catalog";
import Details from "./Pages/Details/Details";
import Home from "./Pages/Home";
import Layout from "./Layout/Layout";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import ForgotPassword from "./Pages/auth/ForgotPassword";
import UpdatePassword from "./Pages/auth/UpdatePassword";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category/search/:keyword" element={<Catalog />} />
          <Route path="/:category/:id" element={<Details />} />
          <Route path="/:category" element={<Catalog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
