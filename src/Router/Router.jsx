import { createBrowserRouter } from "react-router";
import Navbar from "../component/Navbar/Navbar";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navbar></Navbar>,
  },
]);
