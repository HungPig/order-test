import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import ProductPage from "./pages/product";
import CategoryPage from "./pages/categories/category";
import OrderPage from "./pages/order";
const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage />,
    children: [
      {
        index: true,
        element: <div>Homepage</div>
      },
      {
        path: "/product",
        element: <ProductPage/>,
      },
      {
        path: "category",
        element: <CategoryPage/>
      },
      {
        path: "order",
        element: <OrderPage/>
      }
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
