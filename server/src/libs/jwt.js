import { TOKEN_SECRET } from "../config.js";
import jwt from "jsonwebtoken";

export async function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

export async function verifyAccessToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, TOKEN_SECRET, (err, payload) => {
      if (err) reject(err);
      resolve(payload);
    });
  });
}
