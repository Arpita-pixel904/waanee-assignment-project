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



export const getActivityLogs =
  async () => {

    const result =
      await pool.query(`
        SELECT
          al.id,
          al.lead_id,
          al.user_id,

          l.name AS lead_name,

          u.full_name AS user_name,

          al.activity_type,
          al.old_value,
          al.new_value,
          al.created_at

        FROM activity_logs al

        LEFT JOIN leads l
          ON al.lead_id = l.id

        LEFT JOIN users u
          ON al.user_id = u.id

        ORDER BY
          al.created_at DESC
      `);

    return result.rows;
  };