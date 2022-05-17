import { Response } from "../../types/Response";
import { config } from "../config";

class OpenAiApi {
  private baseUrl: string;
  private headers;

  constructor() {
    this.baseUrl = config.openAi.baseUrl;
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config.openAi.secret}`,
    };
  }

  private async handleResponse(res: any): Promise<any> {
    if (res.ok) {
      return Promise.resolve(res.json())
        .then((data) => data)
        .then((data) => {
          return {
            id: data.id,
            response: data.choices[0].text,
          };
        });
    }
    return Promise.reject(res.json());
  }

  public async sendPrompt(prompt: string): Promise<Response> {
    return await fetch(`${this.baseUrl}/engines/text-curie-001/completions`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        prompt,
        temperature: 0.5,
        max_tokens: 50,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      }),
    })
      .then(this.handleResponse)
      .then((data) => {
        return {
          id: data.id,
          prompt: prompt,
          response: data.response,
        };
      });
  }
}

const openAiApi = new OpenAiApi();
export default openAiApi;
