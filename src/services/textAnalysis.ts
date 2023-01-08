import type { TextProcessorType } from "./textProcessor";

const MAX_TEXT_LENGTH = 1000;

export class TextAnalysis {
  text: string;
  processor: TextProcessorType;
  resultText: string | undefined;
  constructor(text: string, processor: TextProcessorType) {
    this.text = text;
    this.processor = processor;
    this.resultText = "";
    if (text.length > MAX_TEXT_LENGTH) {
      throw new TextAnalysisError(
        "Text can not be longer than " + MAX_TEXT_LENGTH.toString()
      );
    }
  }

  formatText() {
    if (this.textContainsWords()) {
      const firstWord = this.text.split(",")[0];
      const firstExample = `${firstWord}\nCategory:`;
      this.text = this.text + "\n\n" + firstExample;
    }
  }
  prettyResultText() {
    if (this.textContainsWords()) {
      this.removeNewlineFromResultText();
      // this.resultText = this.resultText
      //   ?.replaceAll(" ", ", ")
      //   .replaceAll("Category", "");
    } else {
      this.removeWhiteSpaceFromResultText();
    }
  }

  textContainsWords() {
    return this.text.split(",").length > 0;
  }
  removeNewlineFromResultText() {
    this.resultText = this.resultText?.replaceAll("\n", " ").trimStart();
  }
  removeWhiteSpaceFromResultText() {
    this.resultText = this.resultText?.trim();
  }
}

class TextAnalysisError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "TextAnalysisError";
  }
}
