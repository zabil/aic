class PromptError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PromptError";
  }
}

export default function getPrompt() {
  if (process.argv.length <= 2) {
    throw new PromptError("Please provide a prompt and try again.");
  }

  return process.argv.slice(2).join(" ");
}
