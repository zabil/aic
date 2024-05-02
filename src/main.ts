#!/usr/bin/env bun

import OpenAI from "openai";
import ora from "ora";

async function withSpinner<T>(action: () => Promise<T>): Promise<T> {
  const spinner = ora().start();
  try {
    const result = await action();
    spinner.stop();
    return result;
  } catch (error) {
    spinner.stop();
    throw error;
  }
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.log(
      "The OPENAI_API_KEY environment variable is not defined. Please set it and try again.",
    );
    process.exit(1);
  }

  const openai = new OpenAI({ apiKey });
  if (process.argv.length <= 2) {
    console.log("Please provide a prompt and try again.");
    process.exit(1);
  }

  const content = process.argv.slice(2).join(" ");

  const stream = await withSpinner(() =>
    openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content,
        },
      ],
      stream: true,
    }),
  );

  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content || "");
  }
  process.stdout.write("\n");
}

main();
