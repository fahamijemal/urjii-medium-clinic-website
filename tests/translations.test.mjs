import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
function pages(root) {
  return readdirSync(root, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory()
      ? pages(`${root}/${e.name}`)
      : e.name === "index.html"
        ? [`${root}/${e.name}`]
        : [],
  );
}
function visible(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/g, "")
    .replace(/<[^>]+>/g, " ");
}
for (const locale of ["om", "am"])
  test(`${locale}: translated visible interface on every exported page`, () => {
    const files = pages(`out/${locale}`);
    assert.ok(files.length >= 15);
    for (const file of files) {
      const html = readFileSync(file, "utf8");
      const text = visible(html);
      for (const stale of [
        "MEDIUM CLINIC",
        "Health Officer",
        "Skip to content",
        "Opening hours",
        "Contact us",
        "In preparation",
        "Verified contact numbers",
      ])
        assert.ok(!text.includes(stale), `${file}: untranslated ${stale}`);
      assert.match(html, new RegExp(`<html lang="${locale}"`));
    }
  });
test("Amharic branch title and metadata are localized", () => {
  const html = readFileSync("out/am/branches/qollo-sirrii/index.html", "utf8");
  assert.match(html, /<h1>ቆሎ ሲሪ<\/h1>/);
  assert.match(html, /<title>ቆሎ ሲሪ/);
  assert.ok(visible(html).includes("ቡኖ በደሌ ዞን"));
});
test("mobile shortcuts use the correct contact and localized routes", () => {
  for (const locale of ["om", "en", "am"]) {
    const html = readFileSync(`out/${locale}/index.html`, "utf8");
    const nav = html.match(/<nav class="mobile-actions"[\s\S]*?<\/nav>/)?.[0];
    assert.ok(nav);
    assert.ok(nav.includes("tel:+251961548101"));
    assert.ok(nav.includes(`/${locale}/branches/`));
    assert.ok(nav.includes(`/${locale}/contact/`));
  }
});
