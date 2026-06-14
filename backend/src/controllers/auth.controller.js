import * as authService from "../services/auth.service.js";

export const registerUser = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
// export const refreshToken = async (req, res, next) => {
//   try {
//     const { refreshToken } = req.body;

//     const token = await authService.refreshUserToken(refreshToken);

//     res.status(200).json({
//       success: true,
//       data: token,
//     });
//   } catch (error) {
//     next(error);
//   }
// };



export const getProfile = async (req, res, next) => {
  try {
    const profile = await authService.getUserProfile(req.user.id);

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};
