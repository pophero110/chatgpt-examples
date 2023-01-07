import { openaiClient } from "../../server/openaiClient";

const MAX_TEXT_LENGTH = 1000;
export class Classification {
  text: string;
  constructor(text: string) {
    this.text = text;
    if (text.length > MAX_TEXT_LENGTH) {
      throw new ClassificationError(
        "Text can not be longer than " + MAX_TEXT_LENGTH.toString()
      );
    }
  }
  async process() {
    const response = await openaiClient.createCompletion({
      prompt:
        "The following is a sequence of companies and the categories they fall into:\n" +
        this.text +
        "\n",
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 64,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    });

    if (response.status != 200) {
      throw new ClassificationError(
        "Error - HTTP status: " + response.statusText
      );
    }
    if (this.text.split(",").length > 1) {
      const modifiedText = response.data.choices[0]?.text
        ?.replace("\n", "")
        .replaceAll("\n", ",");
      console.log(modifiedText);
      return modifiedText;
    } else {
      // trim remove whitespace from both ends of a string
      return response.data.choices[0]?.text?.trim();
    }
  }
}

class ClassificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ClassificationError";
  }
}
