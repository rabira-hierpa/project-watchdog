export const BASE_URL = process.env.REACT_APP_PUBLIC_URL;

export const constants = {
  USER: "user",
  TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  EXPIRES_AT: "expiresAt",
};

export const PHONE_REGX_NUMBER_CHECK = /^[0-9]+$/;

export const PHONE_REGX_CHECK = "^\\+[1-9]\\d{8,14}$";
