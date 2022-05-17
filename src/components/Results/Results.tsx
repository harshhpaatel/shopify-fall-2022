import React from "react";
import { Space, Text, createStyles } from "@mantine/core";
import { Response } from "../../types/Response";

import ResultCard from "../ResultCard/ResultCard";

type ResultsProps = {
  results: Response[];
};

const useStyles = createStyles((theme) => ({
  emptyText: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.dark[5],
  },
}));

const Results: React.FC<ResultsProps> = (props) => {
  const { classes } = useStyles();
  const { results } = props;

  if (results.length === 0) {
    return (
      <div>
        <Space h="md" />
        <Text className={classes.emptyText}>No results yet.</Text>
      </div>
    );
  }

  return (
    <>
      {results.map((result, i) => (
        <>
          <ResultCard
            key={i}
            prompt={result.prompt}
            response={result.response}
          />
          <Space h="md" />
        </>
      ))}
    </>
  );
};

export default Results;
