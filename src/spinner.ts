import ora from "ora";

export default async function withSpinner<T>(
  action: () => Promise<T>,
): Promise<T> {
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
