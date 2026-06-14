import pool from "../dbConfig.js";

/**
 * Create Lead
 */
export const createLead = async ({
  name,
  email,
  phone,
  source,
  notes,
  assignedTo,
  createdBy
}) => {

  const query = `
    INSERT INTO leads
    (
      name,
      email,
      phone,
      source,
      notes,
      assigned_to,
      created_by
    )
    VALUES
    (
      $1,$2,$3,$4,$5,$6,$7
    )
    RETURNING *
  `;

  const values = [
    name,
    email,
    phone,
    source,
    notes,
    assignedTo,
    createdBy
  ];

  const result =
    await pool.query(
      query,
      values
    );

  return result.rows[0];
};

/**
 * Get Agents
 */
export const getAllAgents = async () => {

  const result =
    await pool.query(`
      SELECT
        id,
        full_name,
        email
      FROM users
      WHERE role = 'AGENT'
      AND is_active = true
      ORDER BY id ASC
    `);

  return result.rows;
};

export const getAllLeads = async ({
  page,
  limit,
  search,
  status,
  source,
  sortBy,
  sortOrder
}) => {

  const offset =
    (page - 1) * limit;

  let query = `
    SELECT
      l.*,
      u.full_name AS assigned_agent
    FROM leads l
    LEFT JOIN users u
      ON l.assigned_to = u.id
    WHERE 1=1
  `;

  const values = [];
  let paramCount = 1;

  if (search) {

    query += `
      AND (
        l.name ILIKE $${paramCount}
        OR l.email ILIKE $${paramCount}
        OR l.phone ILIKE $${paramCount}
      )
    `;

    values.push(`%${search}%`);
    paramCount++;

  }

  if (status) {

    query += `
      AND l.status = $${paramCount}
    `;

    values.push(status);
    paramCount++;

  }

  if (source) {

    query += `
      AND l.source = $${paramCount}
    `;

    values.push(source);
    paramCount++;

  }

  const allowedSortFields = [
    'created_at',
    'name',
    'status'
  ];

  if (
    !allowedSortFields.includes(sortBy)
  ) {
    sortBy = 'created_at';
  }

  sortOrder =
    sortOrder?.toUpperCase() === 'ASC'
      ? 'ASC'
      : 'DESC';

  query += `
    ORDER BY l.${sortBy}
    ${sortOrder}
  `;

  query += `
    LIMIT $${paramCount}
    OFFSET $${paramCount + 1}
  `;

  values.push(limit);
  values.push(offset);

  const result =
    await pool.query(
      query,
      values
    );

  return result.rows;
};

export const getLeadById = async (
  leadId
) => {

  const result =
    await pool.query(
      `
      SELECT
        l.*,
        u.full_name AS assigned_agent
      FROM leads l
      LEFT JOIN users u
      ON l.assigned_to = u.id
      WHERE l.id = $1
      `,
      [leadId]
    );

  return result.rows[0];
};

export const updateLead = async (
  leadId,
  updateData
) => {

  const {
    name,
    email,
    phone,
    source,
    notes
  } = updateData;

  const result =
    await pool.query(
      `
      UPDATE leads
      SET
        name = $1,
        email = $2,
        phone = $3,
        source = $4,
        notes = $5,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
      `,
      [
        name,
        email,
        phone,
        source,
        notes,
        leadId
      ]
    );

  return result.rows[0];
};

export const updateLeadStatus = async (
  leadId,
  status
) => {

  const result =
    await pool.query(
      `
      UPDATE leads
      SET
        status = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
      `,
      [
        status,
        leadId
      ]
    );

  return result.rows[0];
};

export const assignLead = async (
  leadId,
  assignedTo
) => {

  const result =
    await pool.query(
      `
      UPDATE leads
      SET
        assigned_to = $1,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
      `,
      [
        assignedTo,
        leadId
      ]
    );

  return result.rows[0];
};
 

export const deleteLead = async (
  leadId
) => {

  const result =
    await pool.query(
      `
      DELETE FROM leads
      WHERE id = $1
      RETURNING *
      `,
      [leadId]
    );

  return result.rows[0];
};

export const getNextAgentForAssignment =
  async () => {

    const result =
      await pool.query(`
        SELECT
          u.id,
          u.full_name,
          COUNT(l.id) AS lead_count
        FROM users u
        LEFT JOIN leads l
          ON u.id = l.assigned_to
        WHERE
          u.role = 'AGENT'
          AND u.is_active = true
        GROUP BY
          u.id,
          u.full_name
        ORDER BY
          lead_count ASC,
          u.id ASC
        LIMIT 1
      `);

    return result.rows[0];
};



