export const enrichLead = async (
  req,
  res,
  next
) => {
  try {

    return res.status(200).json({
      success: true,
      message:
        "Utility API not implemented yet"
    });

  } catch (error) {
    next(error);
  }
};