import {
  createStyles,
  PasswordInput,
  TextInput,
  Button,
  Container,
  Title,
  Box,
  Stack,
  Alert,
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

const SignUp = () => {
  // You can add these classes as classNames to any Mantine input, it will work the same
  const { classes } = useStyles();
  const [visible, { toggle }] = useDisclosure(false);
  const { signup } = useAuth();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null!);
  const passwordRef = useRef<HTMLInputElement>(null!);
  const passwordCfmRef = useRef<HTMLInputElement>(null!);

  let navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("clicked");

    if (passwordCfmRef.current.value !== passwordRef.current.value) {
      return setError("Passwords do not match!");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Failed to create account");
    }
    setLoading(false);
  };

  return (
    <Container sx={{ maxWidth: 500 }} mx="auto">
      <Title order={2} ta="center" py="xs">
        Sign Up here
      </Title>
      {error && (
        <Alert title="Oops!" color="red">
          {error}
        </Alert>
      )}
      <Box>
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
          <Stack sx={{ maxWidth: 380, marginTop: 10 }} mx="auto">
            <PasswordInput
              description="Password must include at least one letter, number and special character"
              label="Password"
              visible={visible}
              onVisibilityChange={toggle}
              ref={passwordRef}
              required
            />
            <PasswordInput
              label="Confirm password"
              visible={visible}
              onVisibilityChange={toggle}
              ref={passwordCfmRef}
              required
            />
          </Stack>

          <Button
            disabled={loading}
            type="submit"
            display="flex"
            justify-content="center"
            align-items="center"
            sx={{ marginTop: 15, width: 380 }}
            mx="auto"
          >
            Create my account!
          </Button>
        </form>
      </Box>

      <Title order={4} ta="center" py="xs">
        Already have an account? <Link to="/login">Log in</Link>
      </Title>
    </Container>
  );
};

export default SignUp;
