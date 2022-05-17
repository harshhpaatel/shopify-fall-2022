import React from "react";
import {
  AppShell,
  Header,
  Text,
  Container,
  Switch,
  createStyles,
  useMantineColorScheme,
} from "@mantine/core";
import { Outlet } from "react-router-dom";

type MyAppShellProps = {};

const useStyles = createStyles((theme) => ({
  footerText: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginTop: theme.spacing.xs,
    marginLeft: theme.spacing.md,
  },
  headerWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  darkText: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[8],
    marginRight: theme.spacing.xs,
  },
  footerLink: {
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    borderBottom: `1px solid `,
    ":hover": {
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.dark[4],
    },
  },
}));

const MyAppShell: React.FC<MyAppShellProps> = () => {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="lg" className={classes.headerWrapper}>
          <Text size="sm" className={classes.darkText}>
            {dark ? "Dark" : "Light"} Mode
          </Text>
          <Switch
            color="green"
            checked={dark}
            onChange={(event) =>
              toggleColorScheme(event.currentTarget.checked ? "dark" : "light")
            }
          />
        </Header>
      }
      styles={(theme) => ({
        body: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          flex: 1,
        },
        root: {
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        },
      })}
      footer={
        <Header height={60} p="xs">
          <Text size="sm" className={classes.footerText}>
            Developed by{" "}
            <a
              href="https://harshpatel.ca"
              className={classes.footerLink}
              target="_blank"
              rel="noreferrer"
            >
              Harsh Patel
            </a>
          </Text>
        </Header>
      }
    >
      <Container size="sm">
        <Outlet />
      </Container>
    </AppShell>
  );
};

export default MyAppShell;
