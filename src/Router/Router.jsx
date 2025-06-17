import { createBrowserRouter } from "react-router";
import HomeLayout from "../AllLayouts/HomeLayout/Homelayout";
import Error404 from "../pages/Error404/Error404";
import Home from "../pages/Home/Home";
import Signin from "../pages/Signin/Signin";
import Signup from "../pages/Signup/Signup";
import PrivateRoute from "../component/PrivateRoute";
import AvailableFood from "../pages/AvailableFood/AvailableFood";
import About from "../pages/About/About";
import AddFood from "../pages/AddFood/AddFood";
import ManageMyFoods from "../pages/ManageMyFood/ManageMyFoods";
import FoodDetails from "../pages/FoodDetails/FoodDetails";
import UpdateFood from "../pages/UpdateFood/UpdateFood";
import MyFoodRequest from "../pages/MyFoodRequest/MyFoodRequest";
import PublicRoute from "../component/PublicRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <Error404 />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error404 />,
      },
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

      {
        path: "aboutUs",
        element: <About></About>,
        errorElement: <Error404 />,
      },
      {
        path: "/availableFoods",
        element: <AvailableFood></AvailableFood>,
        errorElement: <Error404 />,
      },

      {
        path: "/updateFood/:id",
        element: (
          <PrivateRoute>
            <UpdateFood />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const res = await fetch(
            `https://meal-bridge-server-jmroay962-taj-uddins-projects-665cefcc.vercel.app/allFoods/${params.id}`
          );
          if (!res.ok) throw new Response("Not Found", { status: 404 });
          return res.json();
        },
      },
      {
        path: "/addFood",
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
        errorElement: <Error404 />,
      },

      {
        path: "/myFoodRequest",
        element: (
          <PrivateRoute>
            <MyFoodRequest></MyFoodRequest>
          </PrivateRoute>
        ),
        errorElement: <Error404 />,
      },
      {
        path: "/manageMyFoods",
        element: (
          <PrivateRoute>
            <ManageMyFoods></ManageMyFoods>
          </PrivateRoute>
        ),
        errorElement: <Error404 />,
      },
      {
        path: "/allfoods/:id",
        element: (
          <PrivateRoute>
            <FoodDetails></FoodDetails>
          </PrivateRoute>
        ),
        errorElement: <Error404 />,
      },
    ],
  },
  {
    path: "*",
    element: <Error404 />, // catch-all fallback for unknown routes
  },
]);
