#!/usr/bin/env node

import { execSync } from "child_process";
import path from "path";

const args = process.argv.slice(2);
const command = args[0];
const scriptDir = path.join(__dirname, "..", "lib", "file-mode");
const tsNodeCommand =
  "npx ts-node --project tsconfig.json -r tsconfig-paths/register";

if (command === "new") {
  console.log("Running OmniSearch AI - New Blog Generator\n");
  execSync(`${tsNodeCommand} "${path.join(scriptDir, "generate.ts")}"`, {
    stdio: "inherit",
    cwd: process.cwd(),
  });
} else if (command === "optimize") {
  console.log("Running OmniSearch AI - Blog Optimizer\n");
  execSync(`${tsNodeCommand} "${path.join(scriptDir, "optimize.ts")}"`, {
    stdio: "inherit",
    cwd: process.cwd(),
  });
} else {
  console.log(`
OmniSearch AI CLI
=================

Usage:
  npx omnisearch-ai new        Generate a new blog from input/new-blog.json
  npx omnisearch-ai optimize   Optimize input/existing-blog.md

Setup:
  cp .env.example .env.local
  # Add GEMINI_API_KEY to .env.local

  cp input/new-blog.example.json input/new-blog.json
  # Fill in your blog details

Then run:
  npx omnisearch-ai new

Output goes to /output as .json, .md, and -metadata.json files.
  `);
}
