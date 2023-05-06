import { useState, useRef } from "react";
import { IconX, IconCheck } from "@tabler/icons";
import {
  Container,
  PasswordInput,
  Progress,
  Text,
  Popover,
  Box,
  Button,
  Alert,
} from "@mantine/core";
import { useAuth } from "../firebaseContext/FirebaseContext";

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      color={meets ? "teal" : "red"}
      sx={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <IconCheck size={14} /> : <IconX size={14} />}{" "}
      <Box ml={10}>{label}</Box>
    </Text>
  );
}

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

function getStrength(password: string) {
  let multiplier = password.length > 5 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
}

export const ForgotPassword = () => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef<HTMLInputElement>(null!);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));

  const strength = getStrength(value);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";
  const { passwordReset } = useAuth();

  const handlePasswordResetSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await passwordReset(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <Container sx={{ maxWidth: 500 }} mx="auto">
      <Popover
        opened={popoverOpened}
        position="bottom"
        width="target"
        transition="pop"
      >
        {error && (
          <Alert title="Oops!" color="red">
            {error}
          </Alert>
        )}
        {!error && message && (
          <Alert title="Success!" color="green">
            {message}
          </Alert>
        )}
        <Popover.Target>
          <form onSubmit={handlePasswordResetSubmit}>
            <div
              onFocusCapture={() => setPopoverOpened(true)}
              onBlurCapture={() => setPopoverOpened(false)}
            >
              <h2>Password Reset</h2>
              <PasswordInput
                withAsterisk
                sx={{ width: 400 }}
                my={20}
                label="Password Reset"
                placeholder="Your new password"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
              />
              <Button disabled={loading} type="submit" sx={{ width: 250 }}>
                Reset Password
              </Button>
            </div>
          </form>
        </Popover.Target>
        <Popover.Dropdown>
          <Progress
            color={color}
            value={strength}
            size={5}
            style={{ marginBottom: 10 }}
          />
          <PasswordRequirement
            label="Includes at least 6 characters"
            meets={value.length > 5}
          />
          {checks}
        </Popover.Dropdown>
      </Popover>
    </Container>
  );
};
