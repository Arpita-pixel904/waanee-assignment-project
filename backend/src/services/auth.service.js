import bcrypt from "bcrypt";

import {
  findUserByEmail,
  createUser,
  findUserById
    
} from "../repositories/auth.repository.js";


import {
  generateAccessToken,
} from "../utils/jwtutils.js";

const allowedRoles = [
  "ADMIN",
  "MANAGER",
  "AGENT"
];

export const register = async ({ fullName, email, password, role }) => {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("User already exists");
  }

 role = role?.trim().toUpperCase();

  if (!allowedRoles.includes(role)) {
    throw new Error(
      "Invalid role"
    );
  }

  
  const passwordHash = await bcrypt.hash(password, 10);



  const user = await createUser({
    fullName,
    email,
    passwordHash,
    role,
  });

  return {
    id: user.id,
    fullName: user.full_name,
    email: user.email,
    role: user.role,
  };
};

export const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user);


  // const expiryDate = new Date();

  // expiryDate.setDate(expiryDate.getDate() + 7);

  // await saveRefreshToken(user.id, refreshToken, expiryDate);
  return {
    accessToken,
    // refreshToken,
    user: {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      role: user.role,
    },
  };
};



// export const refreshUserToken =
//   async (refreshToken) => {

//     const storedToken =
//       await findRefreshToken(
//         refreshToken
//       );

//     if (!storedToken) {
//       throw new Error(
//         'Refresh token invalid'
//       );
//     }

//     const decoded =
//       verifyRefreshToken(
//         refreshToken
//       );

//     const user =
//       await findUserById(
//         decoded.id
//       );

//     const accessToken =
//       generateAccessToken(user);

//     return {
//       accessToken
//     };
// };

// export const logout =
//   async (refreshToken) => {

//     await deleteRefreshToken(
//       refreshToken
//     );

//     return true;
// };

export const getUserProfile =
  async (userId) => {

    return await findUserById(
      userId
    );
};