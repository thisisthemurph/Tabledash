import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../../config.js";

export async function authenticate(req, res, next) {
  const token = req.header("auth-token");

  if (!token) {
    res.status(401).send("Access Denied");
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified.user;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}

export function requireAdmin(req, res, next) {
  const { user } = req;

  if (!user) {
    res.status(500).send("No user available to verify");
  }

  if (user.isAdmin === true) {
    next();
  } else {
    res.status(401).send("Unauthorized - admin privelages required");
  }
}
