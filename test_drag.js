const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err.toString()));

  await page.goto('http://localhost:1234', { waitUntil: 'networkidle0' });

  // Click sidebar to add a node
  const sidebarItems = await page.$$('[draggable="true"]');
  if (sidebarItems.length > 0) {
    await sidebarItems[0].click();
  }

  // Let's get the positions of the nodes
  const nodes = await page.$$eval('[role="group"]', els => {
    return els.map(el => {
      const rect = el.getBoundingClientRect();
      return { id: el.id, left: rect.left, top: rect.top, width: rect.width, height: rect.height, style: el.style.cssText, outerHTML: el.outerHTML.substring(0, 200) };
    });
  });
  
  console.log('INITIAL NODES:', JSON.stringify(nodes, null, 2));

  if (nodes.length > 0) {
    const node = nodes[0];
    // Drag the first node
    const startX = node.left + node.width / 2;
    const startY = node.top + 20;
    
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    
    await page.mouse.move(startX + 100, startY + 100, { steps: 10 });
    await page.mouse.up();
    
    // Check positions again
    const newNodes = await page.$$eval('[role="group"]', els => {
      return els.map(el => {
        const rect = el.getBoundingClientRect();
        return { id: el.id, left: rect.left, top: rect.top };
      });
    });
    
    console.log('NEW NODES:', JSON.stringify(newNodes, null, 2));
  } else {
    console.log('No nodes found to drag');
  }

  await browser.close();
})();
