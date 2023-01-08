import { TextAnalysis } from "./textAnalysis";
import type { TextProcessorType } from "./textProcessor";
export class Summarizer extends TextAnalysis {
  constructor(text: string, processor: TextProcessorType) {
    super(text, processor);
  }
  async process() {
    const prompt = this.text + "\n\nTl;dr";

    const response = await this.processor(prompt);
    this.resultText = response.data.choices[0]?.text;
    console.log(prompt);
    console.log(this.resultText);
    if (this.textContainsWords()) {
      this.removeNewlineFromResultText();
    } else {
      this.removeWhiteSpaceFromResultText();
    }

    return this.resultText;
  }
}
