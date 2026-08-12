import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

function loadEnvFile(path: string) {
  let contents: string;
  try {
    contents = readFileSync(path, "utf8");
  } catch {
    return;
  }
  for (const line of contents.split("\n")) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (!match) continue;
    const [, key, rawValue = ""] = match;
    if (process.env[key] !== undefined) continue;
    process.env[key] = rawValue.replace(/^["']|["']$/g, "").trim();
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "86d0qc2o";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_WRITE_TOKEN;
const commit = process.argv.includes("--commit");

if (!token) {
  console.error(
    "Missing SANITY_WRITE_TOKEN (needs Editor permissions on the dataset)."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  token,
  useCdn: false,
});

const CATEGORIES = [
  { title: "Tech", slug: "tech" },
  { title: "Healthcare", slug: "healthcare" },
  { title: "Finance", slug: "finance" },
  { title: "Construction", slug: "construction" },
  { title: "Legal", slug: "legal" },
  { title: "Pest Control", slug: "pest-control" },
];

const categoryId = (slug: string) => `success-story-category-${slug}`;

async function main() {
  const transaction = client.transaction();

  CATEGORIES.forEach((category, index) => {
    transaction.createOrReplace({
      _id: categoryId(category.slug),
      _type: "successStoryCategory",
      title: category.title,
      slug: { _type: "slug", current: category.slug },
      order: index + 1,
    });
  });

  console.log(
    `${commit ? "Writing" : "Dry run —"} ${CATEGORIES.length} success story categories to ${projectId}/${dataset}`
  );
  CATEGORIES.forEach((category) => console.log(`  ${category.title}`));

  if (!commit) {
    console.log("\nNothing written. Re-run with --commit to apply.");
    return;
  }

  await transaction.commit();
  console.log("\nDone.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
