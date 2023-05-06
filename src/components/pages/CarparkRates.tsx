import { useMediaQuery } from "@mantine/hooks";
import CarparkRatesDesktop from "./CarparkRatesDesktop";
import CarparkRatesMobile from "./CarparkRatesMobile";

const Dashboard = () => {
  const mobile = useMediaQuery("(max-width: 500px)");
  return <>{mobile ? <CarparkRatesMobile /> : <CarparkRatesDesktop />}</>;
};

export default Dashboard;
