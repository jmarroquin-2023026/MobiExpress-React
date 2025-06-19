import { Outlet } from "react-router-dom";
import Navbar from "../../components/NavBar/NavBar";

export const ProfileConfPage = () => {
  return (
    <div>
      <Outlet />
      <Navbar/>
    </div>
  );
};