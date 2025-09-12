const fs = require('fs');
const fetch = require('node-fetch');

async function getTuronPriceUSD() {
  try {
    // Fetch TURON/XCP price from Counterblock
    const turonRes = await fetch("https://counterblock.io/api/market/TURON_XCP");
    const turonData = await turonRes.json();
    const turonXCP = parseFloat(turonData.last_price);

    // Fetch XCP/USD price from CoinGecko
    const xcpRes = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=counterparty&vs_currencies=usd");
    const xcpData = await xcpRes.json();
    const xcpUSD = parseFloat(xcpData.counterparty.usd);

    // Final TURON/USD conversion
    return parseFloat((turonXCP * xcpUSD).toFixed(2));
  } catch (err) {
    console.error("Live feed failed, using fallback price:", err);
    return 24.34; // Fallback static price
  }
}

(async () => {
  const turonPrice = await getTuronPriceUSD();
  const today = new Date().toISOString().split('T')[0];

  const filePath = 'turon-history.json';
  const history = JSON.parse(fs.readFileSync(filePath));

  if (history.some(entry => entry.date === today)) {
    console.log("Today's entry already exists.");
    return;
  }

  history.push({ date: today, price_usd: turonPrice });
  const trimmed = history.slice(-30);
  fs.writeFileSync(filePath, JSON.stringify(trimmed, null, 2));
  console.log(`Added ${today}: $${turonPrice}`);
})();
