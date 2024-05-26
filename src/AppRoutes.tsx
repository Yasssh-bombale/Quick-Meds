import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import MedicalStorePage from "./pages/MedicalStorePage";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import { Toaster } from "sonner";
import ProtectedRoute from "./pages/ProtectedRoute";
import CreateStorePage from "./pages/CreateStorePage";
import FormPagesLayout from "./layout/FormPagesLayout";
import StoreDetailsPage from "./pages/StoreDetailsPage";
import UserProfilePage from "./pages/UserProfilePage";
import ManageStorePage from "./pages/ManageStorePage";
import OrdersPage from "./pages/OrdersPage";
import ManageStoreRoute from "./components/ManageStoreRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Toaster visibleToasts={1} position="top-center" richColors />
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

        {/* Dynamic routes */}
        <Route
          path="/medicalstores/:id"
          element={
            <Layout noPading>
              <StoreDetailsPage />
            </Layout>
          }
        />

        {/* NavBar links page routes */}
        <Route
          path="/medicalstores"
          element={
            <Layout noPading>
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

        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>
          {/* create-store page */}
          <Route
            path="/create-store"
            element={
              <FormPagesLayout heading="Create store">
                <CreateStorePage />
              </FormPagesLayout>
            }
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          {/* ManageStorePage */}
          {/* <Route path="/manage-store" element={<ManageStorePage />} /> */}

          {/* testing */}
          <Route element={<ManageStoreRoute />}>
            <Route path="/manage-store" element={<ManageStorePage />} />
          </Route>
          {/* testing^^ */}
        </Route>
        <Route element={<ProtectedRoute />}>
          {/* orders page */}
          <Route
            path="/orders"
            element={
              <Layout>
                <OrdersPage />
              </Layout>
            }
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          {/* userProfile page */}
          <Route
            path="/user-profile"
            element={
              <FormPagesLayout heading="Update user">
                <UserProfilePage />
              </FormPagesLayout>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
