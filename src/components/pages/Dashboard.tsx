import { useMediaQuery } from "@mantine/hooks";
import DashboardDesktop from "./DashboardDesktop";
import DashboardMobile from "./DashboardMobile";

const Dashboard = () => {
  const mobile = useMediaQuery("(max-width: 900px)");
  return <>{mobile ? <DashboardMobile /> : <DashboardDesktop />}</>;
};

export default Dashboard;
