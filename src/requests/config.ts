export const config = {
  openAi: {
    baseUrl:
      process.env.REACT_APP_OPEN_AI_BASE_URL ?? "https://api.openai.com/v1",
    secret: process.env.REACT_APP_OPEN_AI_SECRET ?? "",
  },
};
