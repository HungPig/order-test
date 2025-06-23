import { Outlet } from "react-router-dom";
import SlideMenuPage from "../components/layout/SlideMenu"
const DashboardPage = () => {
    return (
      <>
        <SlideMenuPage />
        <Outlet/>
      </>
    );
}
export default DashboardPage