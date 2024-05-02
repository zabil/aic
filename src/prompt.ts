export default function getPrompt() {
  if (process.argv.length <= 2) {
    console.log("Please provide a prompt and try again.");
    process.exit(1);
  }

  return process.argv.slice(2).join(" ");
}
