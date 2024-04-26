/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';
import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Your are not authorized');
      }

      let varifiedUser = null;

      varifiedUser = jwtHelpers.varifyToken(token, config.jwt.secret as Secret);

      (req as any).user = varifiedUser; // return role, id(own generated)

      if (requiredRoles.length && !requiredRoles.includes(varifiedUser.role)) {
        throw new ApiError(
          httpStatus.FORBIDDEN,
          "Forbidden. You're not allowed for this request.",
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export default auth;
