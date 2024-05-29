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

  const model = process.env.OPENAI_MODEL ?? "gpt-4o";
  const system = process.env.OPENAI_SYSTEM ?? undefined;
  const temperature = (() => {
    const temp = Number.parseFloat(process.env.OPENAI_TEMPERATURE ?? "0.3");
    if (Number.isNaN(temp) || temp < 0 || temp > 1) {
      throw new ConfigError(
        "The OPENAI_TEMPERATURE environment variable must be a number between 0 and 1.",
      );
    }
    return temp;
  })();

  return { apiKey, model, system, temperature };
}
