import { Route, Routes } from "react-router-dom"
import AuthLayout from "./components/auth/layout"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import AdminLayout from "./components/admin-view/layout"
import AdminDashboard from "./pages/admin-view/dashboard"
import AdminFeatures from "./pages/admin-view/features"
import AdminOrders from "./pages/admin-view/orders"
import AdminProducts from "./pages/admin-view/products"
import ShoppingLayout from "./components/shopping-view/layout"
import NotFound from "./pages/not-found"
import ShoppingHome from "./pages/shopping-view/home"
import ShoppingAccount from "./pages/shopping-view/account"
import ShoppingCheckout from "./pages/shopping-view/checkout"
import ShoppingListing from "./pages/shopping-view/listing"
import CheckAuth from "./components/common/check-auth"
import UnauthPage from "./pages/unauth-page"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice"
import PaypalReturnPage from "./pages/shopping-view/paypal-return"
import PaymentSuccessPage from "./pages/shopping-view/payment-success"
// import { Skeleton } from "./components/ui/skeleton"

function App() {

  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // if (isLoading) return <Skeleton className="w-[800] bg-black h-[600px]" />;
  // if (isLoading) {
  //   return (
  //     <div className="w-screen h-screen bg-gray-100 flex items-center justify-center">
  //       <div className="animate-pulse w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200">
  //         <div className="absolute top-0 left-0 w-full h-12 bg-gray-300"></div>
  //         <div className="p-6 space-y-4">
  //           <div className="w-3/4 h-8 bg-gray-300 rounded"></div>
  //           <div className="w-full h-4 bg-gray-300 rounded"></div>
  //           <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  // Enhanced Skeleton Loader

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-gray-100 flex flex-col">
        {/* Navigation Bar */}
        <div className="animate-pulse w-full h-16 bg-gray-300"></div>
  
        {/* Content Section */}
        <div className="flex flex-grow overflow-hidden">
          {/* Sidebar / Filters */}
          <div className="animate-pulse w-1/4 h-full bg-gray-200 p-4 space-y-4 hidden lg:block">
            <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
            <div className="w-full h-4 bg-gray-300 rounded"></div>
            <div className="w-5/6 h-4 bg-gray-300 rounded"></div>
            <div className="w-2/3 h-4 bg-gray-300 rounded"></div>
          </div>
  
          {/* Product Grid */}
          <div className="flex-grow p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill("")
              .map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-200 rounded-lg p-4 space-y-4"
                >
                  <div className="w-full h-40 bg-gray-300 rounded"></div>
                  <div className="w-3/4 h-6 bg-gray-300 rounded"></div>
                  <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  console.log(isLoading, user);

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* common component
      <h1>Header component</h1> */}
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="paypal-success" element={<PaymentSuccessPage />} />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
