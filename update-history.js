const turonPrice = await getTuronPrice();
const fs = require('fs');
const fetch = require('node-fetch');

(async () => {
  const turonPrice = 24.34; // Replace with live fetch logic if available
  const today = new Date().toISOString().split('T')[0];

  const filePath = 'turon-history.json';
  const history = JSON.parse(fs.readFileSync(filePath));

  // Avoid duplicate entries
  if (history.some(entry => entry.date === today)) {
    console.log("Today's entry already exists.");
    return;
  }

  history.push({ date: today, price_usd: turonPrice });
  const trimmed = history.slice(-30); // Keep last 30 days
  fs.writeFileSync(filePath, JSON.stringify(trimmed, null, 2));
})();
