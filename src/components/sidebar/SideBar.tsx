import { useState } from "react";
import { createStyles, Navbar, Group, Code, Text } from "@mantine/core";
import {
  IconMap,
  IconCoin,
  IconHome,
  IconPassword,
  IconLogout,
  IconLogin,
  IconParking,
} from "@tabler/icons";
import { Link } from "react-router-dom";
import { useAuth } from "../firebaseContext/FirebaseContext";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon: string = getRef("icon");
  return {
    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[4]
          : theme.colors.gray[2]
      }`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).background,
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            variant: "light",
            color: theme.primaryColor,
          }).color,
        },
      },
    },
  };
});

const data = [
  { link: "/", label: "Map View", icon: IconMap },
  { link: "/carparkRates", label: "Carpark Rates", icon: IconCoin },
];

export function Navigationbar() {
  const { user } = useAuth();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");

  const links = data.map((item) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      to={item.link}
      key={item.label}
      onClick={() => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <Navbar height="100vh" width={{ sm: 300 }} p="md">
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <IconParking size={28} />
          <Text weight={500} size="sm" color="dimmed" mb="xs">
            {user?.email}
          </Text>
          <Code sx={{ fontWeight: 700 }}>v1.0</Code>
        </Group>
        {links}
        {/* if user has not logged in, direct to login */}
        {user ? (
          <Link
            className={cx(classes.link, {
              [classes.linkActive]: "dashboard" === active,
            })}
            to="/dashboard"
            key="dashboard"
            onClick={() => {
              setActive("dashboard");
            }}
          >
            <IconHome className={classes.linkIcon} stroke={1.5} />
            <span>Dashboard</span>{" "}
          </Link>
        ) : (
          <Link
            to="/login"
            key="dashboard"
            className={cx(classes.link, {
              [classes.linkActive]: "dashboard" === active,
            })}
          >
            <IconHome className={classes.linkIcon} stroke={1.5} />
            <span>Dashboard</span>
          </Link>
        )}
      </Navbar.Section>

      {user ? (
        <Navbar.Section className={classes.footer}>
          <Link to="/passwordReset" className={classes.link}>
            <IconPassword className={classes.linkIcon} stroke={1.5} />
            <span>Reset Password</span>
          </Link>

          <Link to="/logout" className={classes.link}>
            <IconLogout className={classes.linkIcon} stroke={1.5} />
            <span>Logout</span>
          </Link>
          <p style={{ fontSize: "10px" }}>
            <em>
              Disclaimer: Limited to data provided by LTA Datamall.
              <br />
              Zero lot availability could be due to missing data.
              <br />
              Created by Annabel and Shi Quan
            </em>

            <br />
          </p>
        </Navbar.Section>
      ) : (
        <Navbar.Section className={classes.footer}>
          <Link to="/login" className={classes.link}>
            <IconLogin className={classes.linkIcon} stroke={1.5} />
            <span>Login</span>
          </Link>
          <p style={{ fontSize: "10px" }}>
            <em>
              Disclaimer: Limited to data provided by LTA Datamall.
              <br />
              Zero lot availability could be due to missing data.
            </em>
          </p>
        </Navbar.Section>
      )}
    </Navbar>
  );
}
