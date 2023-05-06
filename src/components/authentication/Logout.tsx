import { useAuth } from "../firebaseContext/FirebaseContext";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Alert, Button, Container } from "@mantine/core";
import "./auth.css";

const Logout = () => {
  const { logout } = useAuth();
  const [error, setError] = useState<string>("");

  let navigate = useNavigate();

  const handleClick = async () => {
    setError("");
    try {
      await logout();
      navigate("/", { replace: true });
    } catch {
      setError("Failed to logout!");
    }
  };

  return (
    <Container sx={{ maxWidth: 500 }} mx="auto">
      <h2>Logout</h2>
      {error && (
        <Alert title="Oops!" color="red">
          {error}
        </Alert>
      )}
      <h3>Are you sure you wish to logout?</h3>
      <div className="buttonsDiv">
        <div className="logoutButton">
          <Button onClick={handleClick}>Log out</Button>
        </div>
        <div className="cancelButton">
          <Button>
            <Link to="/map">Cancel</Link>
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default Logout;
