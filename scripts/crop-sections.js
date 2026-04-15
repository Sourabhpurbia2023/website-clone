/**
 * Phase 7 Fix v2: Crop section screenshots from the full-page screenshot
 * Uses sharp to crop the already-captured full_page.png
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.resolve(__dirname, '../output');
const FULL_PAGE = path.join(OUTPUT_DIR, 'screenshots', 'full_page.png');

(async () => {
  console.log('\n📸 Phase 7 Fix v2: Cropping sections from full_page.png\n');

  const sections = JSON.parse(
    fs.readFileSync(path.join(OUTPUT_DIR, 'layout', 'sections.json'), 'utf-8')
  );

  // Get the actual dimensions of the full-page screenshot
  const metadata = await sharp(FULL_PAGE).metadata();
  const imgWidth = metadata.width;
  const imgHeight = metadata.height;
  console.log(`Full page image: ${imgWidth}x${imgHeight}px\n`);

  const updatedSections = [];

  for (const section of sections) {
    const label = section.label;

    // Skip sections with negligible height
    if (section.height < 20) {
      console.log(`  ⚠️  Skipping ${label} — too small (${section.height}px)`);
      updatedSections.push(section);
      continue;
    }

    const top = Math.max(0, Math.round(section.top));
    const height = Math.min(Math.round(section.height), imgHeight - top);
    const width = imgWidth;

    if (height <= 0 || top >= imgHeight) {
      console.log(`  ⚠️  Skipping ${label} — out of bounds (top=${top}, imgH=${imgHeight})`);
      updatedSections.push(section);
      continue;
    }

    const outputFile = path.join(OUTPUT_DIR, 'screenshots', `${label}.png`);

    try {
      await sharp(FULL_PAGE)
        .extract({ left: 0, top, width, height })
        .toFile(outputFile);
      console.log(`  ✅ ${label}.png  (top=${top}, h=${height})`);
      updatedSections.push({ ...section, screenshotPath: `screenshots/${label}.png` });
    } catch (err) {
      console.warn(`  ⚠️  ${label}: ${err.message}`);
      updatedSections.push(section);
    }
  }

  // Persist updated sections
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'layout', 'sections.json'),
    JSON.stringify(updatedSections, null, 2),
    'utf-8'
  );

  const successful = updatedSections.filter((s) => s.screenshotPath).length;
  console.log(`\n✅ Done! ${successful}/${sections.length} sections have screenshots.`);
})();
