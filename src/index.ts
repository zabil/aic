import OpenAI from "openai";

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.log(

      "The OPENAI_API_KEY environment variable is not defined. Please set it and try again.",
    ,
    );
    process.exit(1);
  }

  const openai = new OpenAI({ apiKey });
  const stream = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: "Say this is a test" }],
    stream: true,
  });
  for await (const part of stream) {
    process.stdout.write(part.choices[0]?.delta?.content || "");
  }
  process.stdout.write("\n");
}

main();
