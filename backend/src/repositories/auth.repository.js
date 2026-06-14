import pool from "../dbConfig.js";

export const findUserByEmail = async (email) => {
  const query = `
      SELECT *
      FROM users
      WHERE email = $1
  `;

  const result = await pool.query(query, [email]);

  return result.rows[0];
};


export const createUser = async ({ fullName, email, passwordHash, role }) => {
  const query = `
      INSERT INTO users
      (
        full_name,
        email,
        password_hash,
        role
      )
      VALUES
      (
        $1,
        $2,
        $3,
        $4
      )
      RETURNING *
  `;

  const values = [fullName, email, passwordHash, role];

  const result = await pool.query(query, values);

  return result.rows[0];
};

// export const saveRefreshToken = async (
//   userId,
//   token,
//   expiresAt
// ) => {
//   const query = `
//     INSERT INTO refresh_tokens
//     (
//       user_id,
//       token,
//       expires_at
//     )
//     VALUES ($1,$2,$3)
//   `;

//   await pool.query(query, [
//     userId,
//     token,
//     expiresAt
//   ]);
// };

// export const findRefreshToken = async (
//   token
// ) => {
//   const query = `
//     SELECT *
//     FROM refresh_tokens
//     WHERE token = $1
//   `;

//   const result = await pool.query(
//     query,
//     [token]
//   );

//   return result.rows[0];
// };

// export const deleteRefreshToken = async (
//   token
// ) => {
//   await pool.query(
//     `
//       DELETE FROM refresh_tokens
//       WHERE token = $1
//     `,
//     [token]
//   );
// };

export const findUserById = async (
  userId
) => {
  const result = await pool.query(
    `
      SELECT
        id,
        full_name,
        email,
        role
      FROM users
      WHERE id = $1
    `,
    [userId]
  );

  return result.rows[0];
};