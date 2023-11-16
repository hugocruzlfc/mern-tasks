import { verifyAccessToken } from "../libs/index.js";

export const authRequired = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res
        .status(401)
        .json({ message: ["No token, authorization denied"] });

    const payload = await verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(500).json({ message: [error.message] });
  }
};
