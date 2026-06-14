import pool from "../dbConfig.js";

export const getDashboardStats = async () => {

  const result = await pool.query(`
    SELECT
      COUNT(*) AS total_leads,

      COUNT(*) FILTER
      (
        WHERE status = 'NEW'
      ) AS new_leads,

      COUNT(*) FILTER
      (
        WHERE status = 'CONTACTED'
      ) AS contacted_leads,

      COUNT(*) FILTER
      (
        WHERE status = 'QUALIFIED'
      ) AS qualified_leads,

      COUNT(*) FILTER
      (
        WHERE status = 'CLOSED'
      ) AS closed_leads

    FROM leads
  `);

  return result.rows[0];
};