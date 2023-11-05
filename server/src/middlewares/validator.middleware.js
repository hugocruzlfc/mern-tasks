import { zodErrorsParse } from "../libs/index.js";

export function validateSchema(schema) {
  return async (req, res, next) => {
    try {
      await schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({ errors: zodErrorsParse(error) });
    }
  };
}
