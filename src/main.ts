#!/usr/bin/env bun

import OpenAI from "openai";
import withSpinner from "./spinner";
import readConfig from "./config";
import getPrompt from "./prompt";

async function main() {
  try {
    const { apiKey, model } = await readConfig();
    const content = getPrompt();

    const stream = await withSpinner(() =>
      new OpenAI({ apiKey }).chat.completions.create({
        model,
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
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

main();
