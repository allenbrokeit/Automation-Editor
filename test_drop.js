const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err.toString()));

  await page.goto('http://localhost:1234', { waitUntil: 'networkidle0' });

  // Click the sidebar item
  const sidebarItems = await page.$$('[draggable="true"]');
  if (sidebarItems.length > 0) {
    console.log('Clicking sidebar item...');
    await sidebarItems[0].click();
    
    // Check nodes
    const newNodes = await page.$$eval('[role="group"]', els => {
      return els.map(el => {
        const rect = el.getBoundingClientRect();
        return { id: el.id, left: rect.left, top: rect.top };
      });
    });
    
    console.log('NEW NODES:', JSON.stringify(newNodes, null, 2));
  }

  await browser.close();
})();
