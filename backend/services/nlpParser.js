export function extractFilters(text) {
  const cityRegex = /(pune|mumbai|bangalore|delhi|noida|chennai)/i;
  const bhkRegex = /(\d)\s?bhk/i;
  const budgetRegex = /under\s?₹?([\d.]+)\s?(cr|crore|l|lac|lakh)/i;
  const readyRegex = /(ready\s?to\s?move|under\s?construction)/i;

  const city = text.match(cityRegex)?.[1];
  const bhk = text.match(bhkRegex)?.[1];
  const budgetMatch = text.match(budgetRegex);
  let maxBudget = null;

  if (budgetMatch) {
    let value = parseFloat(budgetMatch[1]);
    const unit = budgetMatch[2].toLowerCase();
    if (unit.startsWith("cr")) value *= 10000000;
    else if (unit.startsWith("l")) value *= 100000;
    maxBudget = value;
  }

  const ready = readyRegex.test(text) ? "ready" : null;

  return { city, bhk, maxBudget, ready };
}
