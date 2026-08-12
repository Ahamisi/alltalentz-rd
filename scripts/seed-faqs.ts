/**
 * Seeds the FAQ content from lib/faq-data.ts into Sanity as `faqCategory` and
 * `faq` documents.
 *
 *   SANITY_WRITE_TOKEN=... npx tsx scripts/seed-faqs.ts          # dry run
 *   SANITY_WRITE_TOKEN=... npx tsx scripts/seed-faqs.ts --commit # actually write
 *
 * Notes:
 *  - Document ids are deterministic and *dotless* (`faq-category-construction`,
 *    `faq-construction-1`). Dotted ids in this dataset aren't publicly readable,
 *    and deterministic ids make the script idempotent: re-running updates the
 *    same documents instead of creating duplicates.
 *  - `createOrReplace` is deliberate — this file is the source of truth for the
 *    initial seed. Any edit made in the studio to a seeded question WILL be
 *    overwritten by a re-run, so treat re-runs as "reset to the file".
 *  - Nothing is deleted. Questions removed from faq-data.ts stay in the dataset;
 *    remove those in the studio.
 */
import { readFileSync } from "node:fs";
import { createClient } from "@sanity/client";
import { faqCategories } from "../lib/faq-data";

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

const categoryId = (slug: string) => `faq-category-${slug}`;
const faqId = (slug: string, index: number) => `faq-${slug}-${index + 1}`;

async function main() {
  const transaction = client.transaction();
  let categoryCount = 0;
  let faqCount = 0;

  faqCategories.forEach((category, categoryIndex) => {
    transaction.createOrReplace({
      _id: categoryId(category.slug),
      _type: "faqCategory",
      title: category.title,
      slug: { _type: "slug", current: category.slug },
      order: categoryIndex + 1,
    });
    categoryCount += 1;

    category.faqs.forEach((faq, index) => {
      transaction.createOrReplace({
        _id: faqId(category.slug, index),
        _type: "faq",
        question: faq.question,
        answer: faq.answer,
        order: index + 1,
        showOnHomepage: false,
        category: {
          _type: "reference",
          _ref: categoryId(category.slug),
        },
      });
      faqCount += 1;
    });
  });

  console.log(
    `${commit ? "Writing" : "Dry run —"} ${categoryCount} categories and ${faqCount} questions to ${projectId}/${dataset}`
  );

  faqCategories.forEach((category) => {
    console.log(`  ${category.title} (${category.faqs.length})`);
  });

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
