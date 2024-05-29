
## Project Overview

A command-line tool for OpenAI's ChatGPT models. It reads configuration settings from environment variables and generates chat completions in a streaming fashion, which are output directly to the terminal.

## Usage

### Prerequisites

There are no binaries to download yet. To run this tool, you need to have the following:

- Ensure you have `bun` installed. If not, you can install it by following the instructions on the [Bun website](https://bun.sh/).
- Set the your [OpenAI API key](https://platform.openai.com/docs/quickstart/step-2-set-up-your-api-key) necessary environment variables, for example

### Running the Tool

To use the tool, simply execute the main script:

```bash
$ make build
$ ./dist/bin/aic Crack a joke
```

Depending on your environment settings, the tool will read the prompt, interact with the OpenAI API, and stream the result directly to your terminal.

## CLI Recipes

You can move the aic binary to a directory in your `PATH` to make it easier to run the tool from anywhere. The following examples assume that the aic binary is in your `PATH`.

### Using with other commands

This tool can be integrated with other command-line tools using pipes. Below are some examples:

#### Format the output with a column width and word wrap

You can use the content of a file as the input prompt:
```bash
$ aic what is the first paragraph of kafkas metamorphosis | fold -sw 80
```

#### Using output of a command as input

You can use the content of a file as the input prompt for example in fish shell:
```bash
OPENAI_SYSTEM="Analyze the git diff and explain the changes" aic (git show)
```

This assumes you are in a git repository and you want to analyze the changes in the latest commit.

#### Using the clipboard

Use the clipboard to rephrase copied text for example (macos fish shell):
```bash
OPENAI_SYSTEM="Rephrase, using simple concise english and active voice possible" aic (pbpaste)
```

You can create aliases for these commands in your favourite shell and an use them as shortcuts.

There are many other ways to use this tool. Feel free to experiment and share your recipes with the community.

## Configuration

The tool reads configuration settings from environment variables. The following environment variables are supported:

- `OPENAI_API_KEY`: Your OpenAI API key. You can get this from the OpenAI platform.
- `OPENAI_SYSTEM`: The system to use for the completion. This can be any of the systems available in the OpenAI platform.
- `OPENAI_MODEL`: The model to use for the completion. This can be any of the models available in the OpenAI platform.
- `OPENAI_TEMPERATURE`: The temperature to use for the completion (default is 0.5). This is a floating point number between 0 and

## For Developers

### Checkout and Build

To build and run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/zabil/aic.git
   cd aic
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Build:
   ```bash
   make build
   ```

4. Run the main script:
   ```bash
   ./src/main.ts
   ```

### Contributing

Please see our `CONTRIBUTING.md` for guidelines on how to proceed.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.
