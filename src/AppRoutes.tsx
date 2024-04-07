import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import MedicalStorePage from "./pages/MedicalStorePage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />

        {/* AuthRoutes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />

        {/* NavBar links page routes */}
        <Route
          path="/medicalstores"
          element={
            <Layout>
              <MedicalStorePage />
            </Layout>
          }
        />
        <Route
          path="/services"
          element={
            <Layout>
              <ServicesPage />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <AboutPage />
            </Layout>
          }
        />

        {/*  */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
