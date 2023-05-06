import { Navigate } from "react-router-dom";
import { useAuth } from "./components/firebaseContext/FirebaseContext";

type PrivateRouteProps = {
  children: React.ReactElement;
};

const PrivateRoute = (props: PrivateRouteProps) => {
  const { user } = useAuth();

  return user?.email ? props.children : <Navigate to="/" />;
};

export default PrivateRoute;
