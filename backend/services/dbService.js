// backend/services/dbService.js
import pkg from "pg";
import dotenv from "dotenv";
import { extractFilters } from "./nlpParser.js";
import { generateSummary } from "./summarizer.js";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
});

export async function handleUserQuery(message) {
  try {
    // Step 1: Extract filters from user message
    const filters = extractFilters(message);
    console.log("Extracted filters:", filters);

    // Step 2: Build SQL query with JOINs
    let query = `
      SELECT 
        p.id AS project_id,
        p.projectName,
        p.slug,
        p.projectSummary,
        p.possessionDate,
        pa.fullAddress,
        pc.customBHK,
        pcv.price
      FROM projects p
      LEFT JOIN project_configurations pc ON p.id = pc.projectId
      LEFT JOIN project_configuration_variants pcv ON pc.id = pcv.configurationId
      LEFT JOIN project_addresses pa ON p.id = pa.projectId
      WHERE 1=1
    `;

    // Step 3: Apply filters dynamically
    if (filters.city) query += ` AND LOWER(pa.fullAddress) LIKE LOWER('%${filters.city}%')`;
    if (filters.bhk) query += ` AND pc.customBHK = '${filters.bhk}BHK'`;
    if (filters.maxBudget) query += ` AND pcv.price <= ${filters.maxBudget}`;
    if (filters.ready) query += ` AND p.possessionDate <= CURRENT_DATE`;

    console.log("SQL Query:", query);

    // Step 4: Execute query
    const { rows } = await pool.query(query);
    console.log("Rows returned:", rows.length);

    // Step 5: Generate summary
    const summary = generateSummary(rows, filters);

    // Step 6: Return results
    return { summary, results: rows };
  } catch (err) {
    console.error("Error in handleUserQuery:", err);
    throw err;
  }
}
