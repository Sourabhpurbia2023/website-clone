/**
 * Phase 7 Fix: Section Screenshot Capture
 * Uses full-page screenshot + Jimp to crop sections by absolute Y coordinates
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const TARGET_URL = 'https://blitz-api.ai/';
const OUTPUT_DIR = path.resolve(__dirname, '../output');

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

(async () => {
  console.log('\n📸 Phase 7 Fix: Section Screenshots\n');

  const sections = JSON.parse(
    fs.readFileSync(path.join(OUTPUT_DIR, 'layout', 'sections.json'), 'utf-8')
  );

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(TARGET_URL, { waitUntil: 'networkidle', timeout: 60000 });

  // Scroll to trigger lazy loading
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 60);
    });
  });
  await sleep(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await sleep(500);

  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const viewportWidth = 1440;

  console.log(`Page height: ${pageHeight}px | Viewport: ${viewportWidth}px`);
  console.log(`Capturing ${sections.length} sections...\n`);

  // For each section, scroll to it and take a viewport-sized screenshot
  const updatedSections = [...sections];

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const screenshotFile = `${section.label}.png`;
    const screenshotPath = path.join(OUTPUT_DIR, 'screenshots', screenshotFile);

    const sectionTop = Math.max(0, section.top);
    const sectionHeight = Math.min(section.height, 4000);

    if (sectionHeight < 10) {
      console.log(`  ⚠️  Skipping ${section.label} — too small (${sectionHeight}px)`);
      continue;
    }

    try {
      // Scroll to the section
      await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 20)), sectionTop);
      await sleep(400);

      // Get the current scroll position
      const scrollY = await page.evaluate(() => window.scrollY);

      // Calculate clip relative to current viewport
      const clipY = sectionTop - scrollY;
      const clipHeight = Math.min(sectionHeight, 900 - Math.max(0, clipY));

      if (clipHeight < 10 || clipY < -50) {
        // Section extends beyond viewport — use element screenshot instead
        const elementHandle = await page.evaluateHandle((sectionData) => {
          const allEls = document.querySelectorAll('header, nav, section, footer, [class*="banner"]');
          for (const el of allEls) {
            const rect = el.getBoundingClientRect();
            const scrollTop = window.scrollY;
            const absTop = Math.round(rect.top + scrollTop);
            if (Math.abs(absTop - sectionData.top) < 30) return el;
          }
          return null;
        }, section);

        if (elementHandle && (await elementHandle.asElement())) {
          const el = await elementHandle.asElement();
          await el.screenshot({ path: screenshotPath });
          console.log(`  📸 ${section.label}.png (element screenshot)`);
          updatedSections[i] = { ...section, screenshotPath: `screenshots/${screenshotFile}` };
        } else {
          // Fallback: take full viewport at scroll position
          await page.screenshot({ path: screenshotPath });
          console.log(`  📸 ${section.label}.png (viewport fallback)`);
          updatedSections[i] = { ...section, screenshotPath: `screenshots/${screenshotFile}` };
        }
        await elementHandle.dispose();
        continue;
      }

      await page.screenshot({
        path: screenshotPath,
        clip: {
          x: 0,
          y: Math.max(0, clipY),
          width: viewportWidth,
          height: clipHeight,
        },
      });
      console.log(`  📸 ${section.label}.png (clip y=${clipY}, h=${clipHeight})`);
      updatedSections[i] = { ...section, screenshotPath: `screenshots/${screenshotFile}` };
    } catch (err) {
      console.warn(`  ⚠️  Error on ${section.label}: ${err.message.split('\n')[0]}`);
    }
  }

  // Update sections.json
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'layout', 'sections.json'),
    JSON.stringify(updatedSections, null, 2),
    'utf-8'
  );
  console.log('\n✅ sections.json updated with screenshot paths');

  await browser.close();
  console.log('✅ Phase 7 Fix Complete!\n');
})();
