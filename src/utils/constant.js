export const path = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  CONTACT:'/contact',
  HISTORY:'/history'
};
export const baseUrl = process.env.REACT_APP_BASE_URL;
export const serverUrl = process.env.REACT_APP_SERVER_URL;
export const apiKey = process.env.REACT_APP_API_KEY;
export const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");