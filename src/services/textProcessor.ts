import { openaiClient } from "../server/openaiClient";

export type TextProcessorType = typeof TextProcessor;
//text-davinci-003
export const TextProcessor = async (prompt: string) => {
  const response = await openaiClient.createCompletion({
    prompt,
    model: "text-curie-001",
    temperature: 0,
    max_tokens: 600,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  if (response.status != 200) {
    throw new TextDavinci3Error("Error - HTTP status: " + response.statusText);
  }
  return response;
};

class TextDavinci3Error extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TextDavinci3Error";
  }
}
