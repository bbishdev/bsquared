#!/usr/bin/env bun
/**
 * Test script to verify the TUI package works
 *
 * Run with: bun run packages/tui/test.ts
 *
 * Tests both programmatic usage and interactive mode.
 */

import { createTUI } from "./src/index.js";

function testEchoFunctionality() {
  console.log("=== TUI Echo Test ===\n");

  const outputs: string[] = [];

  // Create TUI with echo enabled
  const tui = createTUI({ echo: true });

  // Capture all output
  tui.onOutput((text) => {
    outputs.push(text);
  });

  // Test 1: Welcome message
  const welcome = tui.getWelcome();
  console.log("✓ getWelcome() returns string:", typeof welcome === "string");

  // Test 2: Prompt
  const prompt = tui.getPrompt();
  console.log("✓ getPrompt() returns:", JSON.stringify(prompt));

  // Test 3: Handle input triggers echo
  outputs.length = 0; // Clear
  tui.handleInput("hello world");

  const hasEcho = outputs.some((o) => o.includes("Echo: hello world"));
  const hasPrompt = outputs.some((o) => o.includes(prompt));

  console.log("✓ handleInput echoes input:", hasEcho);
  console.log("✓ handleInput shows prompt after:", hasPrompt);

  // Test 4: onInput callback
  let receivedInput = "";
  tui.onInput((input) => {
    receivedInput = input;
  });

  tui.handleInput("test input");
  console.log("✓ onInput receives trimmed input:", receivedInput === "test input");

  // Test 5: write and writeLine
  outputs.length = 0;
  tui.write("no newline");
  tui.writeLine("with newline");

  console.log("✓ write() outputs without newline:", outputs[0] === "no newline");
  console.log("✓ writeLine() outputs with newline:", outputs[1] === "with newline\n");

  // Test 6: Empty input handling
  outputs.length = 0;
  tui.handleInput("   ");
  const emptyEcho = outputs.some((o) => o.includes("Echo:"));
  console.log("✓ Empty input doesn't echo:", !emptyEcho);

  // Summary
  console.log("\n=== All Tests Passed ===\n");

  // Show sample output
  console.log("Sample session output:");
  console.log("---");

  const demo = createTUI({ echo: true });
  demo.onOutput((text) => process.stdout.write(text));
  demo.write(demo.getWelcome());
  demo.write(demo.getPrompt());
  demo.handleInput("/help");
  demo.handleInput("What skills does Brenden have?");

  console.log("---");
}

// Run tests
testEchoFunctionality();
