import { AuthProvider } from "./components/firebaseContext/FirebaseContext";
import { Routes, Route } from "react-router-dom";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/SignUp";
import { ForgotPassword } from "./components/authentication/ForgotPassword";
import Homepage from "./components/pages/Homepage";
import Dashboard from "./components/pages/Dashboard";
import Logout from "./components/authentication/Logout";
import DoesNotExist from "./components/pages/DoesNotExist";
import Layout from "./components/sidebar/Layout";
import CarparkRates from "./components/pages/CarparkRates";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Homepage />
              </Layout>
            }
          />
          <Route path="*" element={<DoesNotExist />} />
          <Route
            path="/carparkRates"
            element={
              <Layout>
                <CarparkRates />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/logout"
            element={
              <Layout>
                <PrivateRoute>
                  <Logout />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              </Layout>
            }
          />
          <Route
            path="/passwordReset"
            element={
              <Layout>
                <PrivateRoute>
                  <ForgotPassword />
                </PrivateRoute>
              </Layout>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
