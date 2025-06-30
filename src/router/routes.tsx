import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddEmployeePage from "../pages/AddEmployeePage";
import AgeStatisticsPage from "../pages/AgeStatisticsPage";
import SalaryStatisticsPage from "../pages/SalaryStatisticsPage";
import DepartmentStatisticsPage from "../pages/DepartmentStatisticsPage";
import Layout from "../pages/Layout";
import LoginPage from "../pages/LoginPage";
import LogoutPage from "../pages/LogoutPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "login", element: <LoginPage /> },
      { path: "add", element: <AddEmployeePage /> },
      { path: "home", element: <HomePage /> },
      { path: "logout", element: <LogoutPage /> },
      { path: "statistics", children: [
          { path: "age", element: <AgeStatisticsPage /> },
          { path: "salary", element: <SalaryStatisticsPage /> },
          { path: "department", element: <DepartmentStatisticsPage /> }

        ]
      },
    ],
  },
]);
export default router;
