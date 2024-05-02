export default async function readConfig() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.log(
      "The OPENAI_API_KEY environment variable is not defined. Please set it and try again.",
    );
    process.exit(1);
  }
  return { apiKey };
}
