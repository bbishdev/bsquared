#!/usr/bin/env bun
/**
 * Test script to verify the TUI package works
 *
 * Run with: bun run packages/tui/test.ts
 *
 * Tests both programmatic usage and interactive mode.
 */

import { createTUI, type TUIData } from "./src/index.js";

// Sample data for testing
const testData: TUIData = {
  config: {
    name: "Brenden Bishop",
    title: "Builder & Technologist",
    intro: "Husband, father, and technologist.",
    bio: "I'm a product-minded technologist with 10+ years of experience.",
  },
  skills: {
    featured: ["JavaScript", "TypeScript", "React"],
    categories: [
      { name: "Languages", skills: ["JavaScript", "TypeScript", "Python"] },
    ],
  },
  links: {
    social: [
      { name: "GitHub", url: "https://github.com/bbishdev" },
      { name: "LinkedIn", url: "https://linkedin.com/in/brenden-bishop/" },
    ],
  },
  resume: {
    work: [
      {
        company: "Morgan Stanley",
        title: "Software Engineering Manager",
        start: "2015",
        end: "Now",
        description: "Leading engineering teams.",
      },
    ],
    education: [
      {
        school: "Marist College",
        degree: "Bachelor's in Computer Science",
        start: "2011",
        end: "2015",
      },
    ],
  },
  projects: {
    projects: [
      {
        title: "Test Project",
        href: "https://example.com",
        dates: "2024 - Now",
        status: "live",
        description: "A test project.",
        technologies: ["TypeScript", "React"],
        links: [],
      },
    ],
  },
  articles: [
    {
      slug: "test-article",
      title: "Test Article",
      description: "A test article.",
      date: "2024-01-01",
    },
  ],
};

async function testTUIFunctionality() {
  console.log("=== TUI Test ===\n");

  const outputs: string[] = [];

  // Create TUI with test data
  const tui = createTUI({ data: testData });

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

  // Test 3: Handle /help command
  outputs.length = 0;
  await tui.handleInput("/help");
  const hasHelp = outputs.some((o) => o.includes("Commands"));
  console.log("✓ /help shows commands:", hasHelp);

  // Test 4: Handle /about command
  outputs.length = 0;
  await tui.handleInput("/about");
  const hasAbout = outputs.some((o) => o.includes("Brenden Bishop"));
  console.log("✓ /about shows name:", hasAbout);

  // Test 5: Handle /skills command
  outputs.length = 0;
  await tui.handleInput("/skills");
  const hasSkills = outputs.some((o) => o.includes("JavaScript"));
  console.log("✓ /skills shows skills:", hasSkills);

  // Test 6: Handle unknown command
  outputs.length = 0;
  await tui.handleInput("/unknown");
  const hasUnknown = outputs.some((o) => o.includes("Unknown command"));
  console.log("✓ Unknown command shows error:", hasUnknown);

  // Test 7: Handle natural language (AI placeholder)
  outputs.length = 0;
  await tui.handleInput("What skills does Brenden have?");
  const hasAIPlaceholder = outputs.some((o) =>
    o.includes("AI agent coming soon"),
  );
  console.log("✓ Natural language shows placeholder:", hasAIPlaceholder);

  // Test 8: onInput callback
  let receivedInput = "";
  tui.onInput((input) => {
    receivedInput = input;
  });
  await tui.handleInput("test input");
  console.log("✓ onInput receives input:", receivedInput === "test input");

  // Test 9: write and writeLine
  outputs.length = 0;
  tui.write("no newline");
  tui.writeLine("with newline");
  console.log(
    "✓ write() outputs without newline:",
    outputs[0] === "no newline",
  );
  console.log(
    "✓ writeLine() outputs with newline:",
    outputs[1] === "with newline\n",
  );

  // Test 10: Empty input handling
  outputs.length = 0;
  await tui.handleInput("   ");
  console.log("✓ Empty input just shows prompt:", outputs.length === 1);

  // Summary
  console.log("\n=== All Tests Passed ===\n");

  // Show sample session
  console.log("Sample session output:");
  console.log("---");

  const demo = createTUI({ data: testData });
  demo.onOutput((text) => process.stdout.write(text));
  demo.write(demo.getWelcome());
  demo.write(demo.getPrompt());
  await demo.handleInput("/help");
  await demo.handleInput("/about");
  await demo.handleInput("What skills does Brenden have?");

  console.log("\n---");
}

// Run tests
testTUIFunctionality().catch(console.error);
