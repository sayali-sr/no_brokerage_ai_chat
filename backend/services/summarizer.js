export function generateSummary(rows, filters) {
  if (!rows.length)
    return `No ${filters.bhk || ""}BHK options found under your criteria. Try increasing your budget or exploring nearby areas.`;

  const total = rows.length;
  const city = filters.city ? `in ${filters.city}` : "";
  const bhk = filters.bhk ? `${filters.bhk}BHK` : "";
  const price = filters.maxBudget ? `under ₹${(filters.maxBudget / 10000000).toFixed(1)} Cr` : "";

  const localities = [...new Set(rows.map(r => r.locality))].slice(0, 3).join(", ");
  return `Found ${total} ${bhk} properties ${city} ${price}. Popular areas include ${localities}.`;
}
