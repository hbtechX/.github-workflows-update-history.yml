const response = await fetch("https://hbtechx.github.io/.github-workflows-update-history.yml/turon-history.json");
const data = await response.json();

async function getTuronPrice() {
  const res = await fetch("https://www.turon.life/");
  const html = await res.text();
  const $ = cheerio.load(html);

  // Replace with actual selector once confirmed
  const priceText = $("span#turon-price").text(); // Example selector
  const price = parseFloat(priceText.replace(/[^0-9.]/g, ""));

  return price;
}

getTuronPrice().then(price => console.log("TURON Price:", price));
