import React from "react";
import { AppShell, Header, Text, createStyles, Container } from "@mantine/core";
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
}));

const MyAppShell: React.FC<MyAppShellProps> = () => {
  const { classes } = useStyles();
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          {/* Header content */}
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
            Developed by Harsh Patel
          </Text>
        </Header>
      }
    >
      <Container>
        <Outlet />
      </Container>
    </AppShell>
  );
};

export default MyAppShell;
