export const asyncHandler = (fn) => (req, res, next) => {
  try {
    fn(req, res, next);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
    });
  }
};
