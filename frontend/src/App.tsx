import { Routes, Route } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';
import { AuthProvider } from '@/context/AuthContext';
import Layout from '@/components/layout/Layout';
import ProtectedRoute from '@/components/layout/ProtectedRoute';

import HomePage from '@/pages/HomePage';
import LaptopsPage from '@/pages/LaptopsPage';
import AccessoriesPage from '@/pages/AccessoriesPage';
import ProductDetailsPage from '@/pages/ProductDetailsPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import OrderConfirmationPage from '@/pages/OrderConfirmationPage';
import SearchPage from '@/pages/SearchPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import FAQPage from '@/pages/FAQPage';
import NotFoundPage from '@/pages/NotFoundPage';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import PriceListPage from '@/pages/PriceListPage';

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <CartProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/laptops" element={<LaptopsPage />} />
              <Route path="/accessories" element={<AccessoriesPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/order-confirmation/:orderId" element={<OrderConfirmationPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/price-list" element={<PriceListPage />} />
              <Route path="/AhmedEltanany" element={<AdminLoginPage />} />
              <Route
                path="/AhmedEltanany/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
