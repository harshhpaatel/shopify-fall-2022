import React from "react";
import { Card, Text, Space, createStyles } from "@mantine/core";

type ResultCardProps = {
  prompt: string;
  response: string;
};

const useStyles = createStyles((theme) => ({
  title: {
    fontWeight: "bold",
  },
}));

const ResultCard: React.FC<ResultCardProps> = (props) => {
  const { prompt, response } = props;
  const { classes } = useStyles();

  return (
    <Card radius="lg">
      <Text>
        <span className={classes.title}>Prompt:</span> {prompt}
      </Text>
      <Space h="md" />
      <Text>
        <span className={classes.title}>Response:</span> {response}
      </Text>
    </Card>
  );
};

export default ResultCard;
