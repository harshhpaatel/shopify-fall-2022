import React from "react";
import { Title, Space, Button, createStyles } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { PromptForm } from "../types/Prompt";
import { Response } from "../types/Response";
import openAiApi from "../requests/openAiApi/openAiApi";

import Prompt from "../components/Prompt/Prompt";
import Results from "../components/Results/Results";

type LandingProps = {};

const useStyles = createStyles((theme) => ({
  titleText: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.dark[5],
  },
  responsesWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Landing: React.FC<LandingProps> = () => {
  const { classes } = useStyles();
  const [results, setResults] = useLocalStorage<Response[]>({
    key: "savedResults",
    defaultValue: [],
  });

  const onSubmit = (values: PromptForm) => {
    return openAiApi
      .sendPrompt(values.promptValue)
      .then((response) => {
        setResults([response, ...results]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <Title order={1} className={classes.titleText}>
        Fun with AI
      </Title>
      <Space h="md" />
      <Prompt onSubmit={onSubmit} />
      <Space h="md" />
      <div className={classes.responsesWrapper}>
        <Title order={3} className={classes.titleText}>
          Responses
        </Title>
        <Button
          color="green"
          radius="lg"
          variant="subtle"
          onClick={() => setResults([])}
        >
          Clear
        </Button>
      </div>
      <Space h="md" />
      <Results results={results} />
    </>
  );
};

export default Landing;
