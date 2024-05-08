class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}

export default async function readConfig() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new ConfigError(
      "The OPENAI_API_KEY environment variable is not defined. Please set it and try again.",
    );
  }

  const model = process.env.OPENAI_MODEL ?? "gpt-4";
  const system = process.env.OPENAI_SYSTEM ?? undefined;

  return { apiKey, model, system };
}
