import { access, readFile } from "fs/promises";
import path from "path";

type CheckResult = { name: string; pass: boolean; message: string };
const results: CheckResult[] = [];

function check(name: string, pass: boolean, message: string) {
  results.push({ name, pass, message });
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function fileContains(
  filePath: string,
  search: string
): Promise<boolean> {
  try {
    const content = await readFile(filePath, "utf-8");
    return content.includes(search);
  } catch {
    return false;
  }
}

async function run() {
  console.log("OmniSearch AI - Pre-Launch Check");
  console.log("==================================\n");

  const requiredFiles = [
    "README.md",
    "CONTRIBUTING.md",
    "LICENSE",
    ".env.example",
    ".gitignore",
    "lib/guides/seo-optimization-guide.md",
    "lib/guides/aeo-optimization-guide.md",
    "lib/guides/geo-optimization-guide.md",
    "input/new-blog.example.json",
    "input/existing-blog.example.md",
    "input/optimize-config.example.json",
    "output/.gitkeep",
    ".github/workflows/ci.yml",
    ".github/ISSUE_TEMPLATE/bug_report.md",
    ".github/ISSUE_TEMPLATE/feature_request.md",
  ];

  for (const file of requiredFiles) {
    const exists = await fileExists(path.join(process.cwd(), file));
    check(`File exists: ${file}`, exists, exists ? "OK" : `MISSING: ${file}`);
  }

  const envLocalExists = await fileExists(path.join(process.cwd(), ".env.local"));
  const gitignoreExcludesEnv =
    (await fileContains(path.join(process.cwd(), ".gitignore"), ".env.local")) ||
    (await fileContains(path.join(process.cwd(), ".gitignore"), ".env*"));
  check(
    ".env.local excluded from git",
    gitignoreExcludesEnv,
    gitignoreExcludesEnv
      ? "OK"
      : "CRITICAL: .env.local is not in .gitignore - API key will be exposed"
  );

  if (envLocalExists) {
    const envHasPlaceholder = await fileContains(
      path.join(process.cwd(), ".env.local"),
      "your_gemini_api_key_here"
    );
    check(
      "Real GEMINI_API_KEY set",
      !envHasPlaceholder,
      envHasPlaceholder
        ? "WARNING: .env.local still has placeholder key - app will not work"
        : "OK"
    );
  }

  const readmeHasPlaceholder = await fileContains(
    path.join(process.cwd(), "README.md"),
    "yourusername"
  );
  check(
    "README yourusername replaced",
    !readmeHasPlaceholder,
    readmeHasPlaceholder
      ? "Replace 'yourusername' in README.md with your GitHub username"
      : "OK"
  );

  const licenseHasPlaceholder = await fileContains(
    path.join(process.cwd(), "LICENSE"),
    "[Your Name]"
  );
  check(
    "LICENSE name filled in",
    !licenseHasPlaceholder,
    licenseHasPlaceholder
      ? "Replace '[Your Name]' in LICENSE with your name"
      : "OK"
  );

  const guideFiles = [
    "lib/guides/seo-optimization-guide.md",
    "lib/guides/aeo-optimization-guide.md",
    "lib/guides/geo-optimization-guide.md",
  ];
  for (const guide of guideFiles) {
    const hasPersonal = await fileContains(
      path.join(process.cwd(), guide),
      "hassanr.com"
    );
    check(
      `${guide} - no personal references`,
      !hasPersonal,
      hasPersonal
        ? `WARN: ${guide} still contains hassanr.com - sanitize before publishing`
        : "OK"
    );
  }

  let passed = 0;
  let failed = 0;

  for (const result of results) {
    const icon = result.pass ? "PASS" : "FAIL";
    console.log(`${icon}  ${result.name}`);
    if (!result.pass) {
      console.log(`      ${result.message}`);
      failed++;
    } else {
      passed++;
    }
  }

  console.log(`\n${passed} passed - ${failed} failed`);

  if (failed === 0) {
    console.log("\nAll checks passed. Ready to publish.\n");
  } else {
    console.log("\nFix the issues above before publishing to GitHub.\n");
    process.exit(1);
  }
}

run().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
