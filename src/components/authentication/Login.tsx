import {
  createStyles,
  PasswordInput,
  TextInput,
  Button,
  Container,
  Paper,
  Alert,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useRef, useState } from "react";
import { useAuth } from "../firebaseContext/FirebaseContext";
import { Link, useNavigate } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
  },

  input: {
    height: "auto",
    paddingTop: 18,
  },

  label: {
    position: "absolute",
    pointerEvents: "none",
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: theme.spacing.sm / 2,
    zIndex: 1,
  },
}));

const Login = () => {
  // You can add these classes as classNames to any Mantine input, it will work the same
  const { classes } = useStyles();
  const [visible, { toggle }] = useDisclosure(false);
  const { login } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);

  let navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("clicked");

    try {
      setError("");
      setLoading(true);
      //what does "!" mean?
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Failed to Login!");
    }
    setLoading(false);
  };

  return (
    <Paper shadow="sm" radius="md" p="sm" sx={{ maxWidth: 500 }} mx="auto">
      <Title order={2} ta="center" py="xs">
        Log In here
      </Title>
      {error && (
        <Alert title="Oops!" color="red">
          {error}
        </Alert>
      )}
      <Container>
        <form onSubmit={handleSubmit}>
          <TextInput
            sx={{ maxWidth: 380 }}
            mx="auto"
            label="Email"
            ref={emailRef}
            placeholder="johnDoe@example.com"
            required
            classNames={classes}
          />
          <PasswordInput
            description="Password must include at least one letter, number and special character"
            // validation of password required here.
            label="Password"
            sx={{ maxWidth: 380 }}
            mx="auto"
            visible={visible}
            onVisibilityChange={toggle}
            ref={passwordRef}
            required
          />

          <Button
            disabled={loading}
            type="submit"
            display="flex"
            justify-content="center"
            align-items="center"
            sx={{ marginTop: 15, width: 380 }}
            mx="auto"
          >
            Log in!
          </Button>
        </form>
      </Container>

      <Title order={4} ta="center" py="xs">
        Don't have an account? <Link to="/signup">Sign Up!</Link>
      </Title>
    </Paper>
  );
};

export default Login;
