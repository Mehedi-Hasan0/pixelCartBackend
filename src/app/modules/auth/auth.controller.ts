/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import httpStatus from 'http-status';
import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const loginData = req.body;

  const result = await AuthService.loginUser(loginData);

  const { refreshToken } = result;

  const cookiesOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookiesOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfuly!',
    data: result,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  const cookiesOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookiesOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const user = (req as any).user;
  const { ...password } = req.body;

  const result = await AuthService.changePassword(user, password);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User password changed successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
};
