import jwt from "jsonwebtoken";
import { Request, Response, NextFunction, RequestParamHandler } from "express";
import { User } from "../../models/user-model";
import { config } from "dotenv";
import { NotAuthorizedError } from "../../errors/not-authorized-error";
config();

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    throw new NotAuthorizedError();
  }

  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    throw new NotAuthorizedError();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const user = await User.findById(decoded.id).select("-password");
    req.user = user!;

    next();
  } catch (e) {
    console.log("token expired");
    throw new NotAuthorizedError();
  }
};
