import pool from "../dbConfig.js";

export const createActivityLog =
  async ({
    leadId,
    userId,
    activityType,
    oldValue = null,
    newValue = null
  }) => {

    const query = `
      INSERT INTO activity_logs
      (
        lead_id,
        user_id,
        activity_type,
        old_value,
        new_value
      )
      VALUES
      (
        $1,$2,$3,$4,$5
      )
    `;

    await pool.query(
      query,
      [
        leadId,
        userId,
        activityType,
        oldValue,
        newValue
      ]
    );
};

export const getAllActivities =
  async () => {

    const result =
      await pool.query(`
        SELECT *
        FROM activity_logs
        ORDER BY created_at DESC
      `);

    return result.rows;
};

export const getActivitiesByLeadId =
  async (leadId) => {

    const result =
      await pool.query(
        `
        SELECT *
        FROM activity_logs
        WHERE lead_id = $1
        ORDER BY created_at DESC
        `,
        [leadId]
      );

    return result.rows;
};