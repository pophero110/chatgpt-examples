import type { TextProcessorType } from "./textProcessor";
import { TextAnalysis } from "./textAnalysis";

export class Classification extends TextAnalysis {
  constructor(text: string, processor: TextProcessorType) {
    super(text, processor);
  }
  async process() {
    this.formatText();

    const prompt =
      "The following is a list of words and the categories they fall into:\n\n" +
      this.text;

    const response = await this.processor(prompt);
    this.resultText = response.data.choices[0]?.text;
    console.log(prompt);
    console.log(this.resultText);

    this.prettyResultText();

    return this.resultText;
  }
}
