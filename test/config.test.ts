import { strict as assert } from 'assert';
import readConfig from '../src/config';
import * as process from 'process';
import { describe, it, beforeEach, fail } from "bun:test";

describe('readConfig', () => {

  beforeEach(() => {
    delete process.env.OPENAI_API_KEY;
    delete process.env.OPENAI_MODEL;
    delete process.env.OPENAI_SYSTEM;
    delete process.env.OPENAI_TEMPERATURE
  });

  it('should throw an error if OPENAI_API_KEY is not set', async () => {
    try {
      await readConfig();
    } catch (error) {
      assert(error.name == "ConfigError" , 'Error should be instance of ConfigError');
      assert.strictEqual(error.message, 'The OPENAI_API_KEY environment variable is not defined. Please set it and try again.');
    }
  });

  it('should return the correct configuration when all environment variables are set', async () => {
    process.env.OPENAI_API_KEY = 'test-api-key';
    process.env.OPENAI_MODEL = 'gpt-3';
    process.env.OPENAI_SYSTEM = 'system-message';
    process.env.OPENAI_TEMPERATURE = '0.7';

    const config = await readConfig();
    assert.strictEqual(config.apiKey, 'test-api-key');
    assert.strictEqual(config.model, 'gpt-3');
    assert.strictEqual(config.system, 'system-message');
    assert.strictEqual(config.temperature, 0.7);
  });

  it('should use default values for model and temperature when they are not set', async () => {
    process.env.OPENAI_API_KEY = 'test-api-key';

    const config = await readConfig();
    assert.strictEqual(config.apiKey, 'test-api-key');
    assert.strictEqual(config.model, 'gpt-4o');
    assert.strictEqual(config.system, undefined);
    assert.strictEqual(config.temperature, 0.3);
  });

  it('should throw an error if OPENAI_TEMPERATURE is not a valid number', async () => {
    process.env.OPENAI_API_KEY = 'test-api-key';
    process.env.OPENAI_TEMPERATURE = 'invalid-number';

    try {
      await readConfig();
      fail("should have thrown an error");
    } catch (error) {
      assert(error.name == "ConfigError", 'Error should be instance of ConfigError');
      assert.strictEqual(error.message, 'The OPENAI_TEMPERATURE environment variable must be a number between 0 and 1.');
    }
  });

  it('should throw an error if OPENAI_TEMPERATURE is out of range', async () => {
    process.env.OPENAI_API_KEY = 'test-api-key';
    process.env.OPENAI_TEMPERATURE = '-1';

    try {
      await readConfig();
      fail("should have thrown an error");
    } catch (error) {
      assert(error.name == "ConfigError", 'Error should be instance of ConfigError');
      assert.strictEqual(error.message, 'The OPENAI_TEMPERATURE environment variable must be a number between 0 and 1.');
    }
  });
});
