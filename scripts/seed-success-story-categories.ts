/**
 * Seeds the six industry chips shown on /success-stories as
 * `successStoryCategory` documents, so the filter rail isn't empty before the
 * first story is written.
 *
 *   SANITY_WRITE_TOKEN=... npx tsx scripts/seed-success-story-categories.ts          # dry run
 *   SANITY_WRITE_TOKEN=... npx tsx scripts/seed-success-story-categories.ts --commit # actually write
 *
 * Only the taxonomy is seeded — the stories themselves are editorial and belong
 * in the studio.
 *
 * Notes:
 *  - Ids are deterministic and *dotless* (`success-story-category-tech`). Dotted
 *    ids in this dataset aren't publicly readable, and deterministic ids make the
 *    script idempotent: re-running updates the same documents rather than
 *    creating duplicates.
 *  - `createOrReplace` means a re-run resets a seeded category to this file, so
 *    rename industries here rather than in the studio.
 *  - Nothing is deleted. Removing an entry below leaves the document in place;
 *    delete those in the studio.
 */
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";

// Minimal .env.local reader so the script works without adding a dotenv dep.
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

/** Order here is the order of the chips on the page. */
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
