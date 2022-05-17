import React, { useState } from "react";
import { Textarea, Button, createStyles } from "@mantine/core";
import { useForm } from "@mantine/form";
import { PromptForm } from "../../types/Prompt";

type PromptProps = {
  onSubmit: (form: PromptForm) => Promise<void>;
};

const useStyles = createStyles((theme) => ({
  submit: {
    marginTop: theme.spacing.xs,
  },
  submitWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const Prompt: React.FC<PromptProps> = (props) => {
  const { onSubmit } = props;
  const { classes } = useStyles();
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      promptValue: "",
    },
  });

  const handleSubmit = (values: PromptForm) => {
    setLoading(true);
    // submit form and reset on success, or show error on failure
    onSubmit(values)
      .then(() => {
        form.reset();
      })
      .catch((err) => {
        console.error(err);
        form.setErrors({ promptValue: err });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Textarea
          placeholder="sing me a song..."
          label="Enter a prompt"
          autosize
          minRows={8}
          radius="lg"
          {...form.getInputProps("promptValue")}
        />
        <div className={classes.submitWrapper}>
          <Button
            color="green"
            radius="lg"
            className={classes.submit}
            type="submit"
            disabled={form.values.promptValue.length === 0}
            loading={loading}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Prompt;
