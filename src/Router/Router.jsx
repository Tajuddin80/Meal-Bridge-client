import { createBrowserRouter } from "react-router";
import HomeLayout from "../AllLayouts/HomeLayout/Homelayout";
import Error404 from "../pages/Error404/Error404";
import Home from "../pages/Home/Home";
import Signin from "../pages/Signin/Signin";
import Signup from "../pages/Signup/Signup";
import PrivateRoute from "../component/PrivateRoute";
import PublicRoute from "../component/PublicRoute";
import AvailableFood from "../pages/AvailableFood/AvailableFood";
import About from "../pages/About/About";
import AddFood from "../pages/AddFood/AddFood";
import ManageMyFoods from "../pages/ManageMyFood/ManageMyFoods";
import FoodDetails from "../pages/FoodDetails/FoodDetails";
import UpdateFood from "../pages/UpdateFood/UpdateFood";
import MyFoodRequest from "../pages/MyFoodRequest/MyFoodRequest";
import DashboardLayout from "../AllLayouts/DashboardLayout/DashboardLayout";
import Overview from "../Overview/Overview";
import Contact from "../pages/Contact/Contact";
import Support from "../pages/Support/Support";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error404 />,
    children: [
      { index: true, element: <Home />, errorElement: <Error404 /> },
      {
        path: "signin",
        element: (
          <PublicRoute>
            <Signin />
          </PublicRoute>
        ),
        errorElement: <Error404 />,
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <Signup />
          </PublicRoute>
        ),
        errorElement: <Error404 />,
      },
      { path: "aboutUs", element: <About />, errorElement: <Error404 /> },
      {
        path: "availableFoods",
        element: <AvailableFood />,
        errorElement: <Error404 />,
      },
      {
        path: "updateFood/:id",
        element: (
          <PrivateRoute>
            <UpdateFood />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const res = await fetch(
            `https://meal-bridge-server-one.vercel.app/allFoods/${params.id}`
          );
          if (!res.ok) throw new Response("Not Found", { status: 404 });
          return res.json();
        },
        errorElement: <Error404 />,
      },
      {
        path: "allfoods/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
        errorElement: <Error404 />,
      },
        {
        path: "support",
        element: <Support></Support>,
        errorElement: <Error404 />,
      },
      {
        path: "contact",
        element: <Contact></Contact>,
        errorElement: <Error404 />,
      },
  
    ],
  },
 {
  path: "/dashboard",
  element: (
    <PrivateRoute>
      <DashboardLayout />
    </PrivateRoute>
  ),
  errorElement: <Error404 />,
  children: [
    { index: true, element: <Overview /> },
         {
        path: "updateFood/:id",
        element: (
         
            <UpdateFood />
       
        ),
        loader: async ({ params }) => {
          const res = await fetch(
            `https://meal-bridge-server-one.vercel.app/allFoods/${params.id}`
          );
          if (!res.ok) throw new Response("Not Found", { status: 404 });
          return res.json();
        },
        errorElement: <Error404 />,
      },
    { path: "addFood", element: <AddFood />, errorElement: <Error404 /> },
    { path: "manageMyFoods", element: <ManageMyFoods />, errorElement: <Error404 /> },
    { path: "myFoodRequest", element: <MyFoodRequest />, errorElement: <Error404 /> },
  ],
}
,
  {
    path: "*",
    element: <Error404 />,
  },
]);
