#!/usr/bin/env bun

import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources";
import readConfig from "./config";
import getPrompt from "./prompt";

async function main() {
  try {
    const { apiKey, model, system, temperature } = await readConfig();
    const content = getPrompt();
    const messages = [
      { role: "user", content },
    ] as ChatCompletionMessageParam[];
    system && messages.push({ role: "system", content: system });

    const stream = await new OpenAI({ apiKey }).chat.completions.create({
      model,
      messages,
      stream: true,
      temperature,
    });

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
