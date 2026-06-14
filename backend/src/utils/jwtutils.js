import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY;

// const REFRESH_SECRET = process.env.REFRESH_SECRET;
// const REFEREH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY;
export const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: TOKEN_EXPIRY },
  );
};

// export const generateRefereshToken = (user) => {
//   return jwt.sign(
//     {
//       id: user.id,
//       email: user.email,
//       role: user.role,
//     },
//     REFRESH_SECRET,
//     { expiresIn: REFEREH_TOKEN_EXPIRY },
//   );
// };

export const verifyAccessToken = (
  token
) => {
  return jwt.verify(
    token,
    JWT_SECRET
  );
};

// export const verifyRefreshToken = (
//   token
// ) => {
//   return jwt.verify(
//     token,
//    REFRESH_SECRET
//   );
// };




