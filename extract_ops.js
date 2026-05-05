const fs = require('fs');
const data = JSON.parse(fs.readFileSync('/Users/g.allenjohnson/.gemini/antigravity/brain/1667ca99-577d-4bae-868a-6904f9ee5e9f/.system_generated/steps/37/output.txt', 'utf8'));

let allOps = [];
data.prescriptions.forEach(rx => {
    if (rx.proposedOps && rx.proposedOps.length > 0) {
        allOps.push(...rx.proposedOps);
    }
});

fs.writeFileSync('./all_ops.json', JSON.stringify(allOps));
console.log('Extracted ops count:', allOps.length);
