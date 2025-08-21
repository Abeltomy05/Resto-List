import { Response } from "express";
import { config } from "../../config/env";

export const setCookies = (
  res: Response,
  accessToken: string,
  refreshToken: string
): void => {


  res.cookie("access-token", accessToken, {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: "lax",
  });

  res.cookie("refresh-token", refreshToken, {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: "lax",
  });
};

export const clearAuthCookies = (res: Response): void => {
  res.clearCookie("access-token");
  res.clearCookie("refresh-token");
};

export const updateCookieWithAccessToken = (
  res: Response,
  accessToken: string,
) => {
   res.cookie("access-token", accessToken,{
      httpOnly: true,
      secure: config.isProduction,
      sameSite: "lax"
   })
}
