const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto('http://localhost:1245');
  
  // Wait for the app to load
  await page.waitForSelector('header');
  
  // Add a node
  await page.evaluate(() => {
    const root = document.querySelector('header').__ref.el.call('getRootState');
    root.update({
      nodes: [
        { id: 'node1', type: 'action_click', x: 100, y: 100, inputs: [{ id: 'in1', relativeX: 0, relativeY: 60}], outputs: [{ id: 'out1', relativeX: 320, relativeY: 60}] },
        { id: 'node2', type: 'action_click', x: 500, y: 100, inputs: [{ id: 'in2', relativeX: 0, relativeY: 60}], outputs: [{ id: 'out2', relativeX: 320, relativeY: 60}] }
      ],
      connections: [
        { id: 'conn1', sourceNodeId: 'node1', sourceSocketId: 'out1', targetNodeId: 'node2', targetSocketId: 'in2' }
      ]
    });
  });
  
  // Wait a bit for render
  await new Promise(r => setTimeout(r, 500));
  
  const html = await page.evaluate(() => {
    const svg = document.querySelector('svg');
    return svg ? svg.outerHTML : 'No SVG found';
  });
  
  console.log("SVG HTML:", html);
  await browser.close();
})();
