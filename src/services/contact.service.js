import axios from "axios";
import { serverUrl } from "~/utils/constant";
export const apiContactRegister = async ({ email, place }) => {
  try {
    const response = await axios.post(`${serverUrl}/contact/register`, {
      email,
      place,
    });
    return response;
  } catch (error) {
    return error;
  }
};
export const apiContactUnsubcribe = async ({ email }) => {
  try {
    const response = await axios.post(`${serverUrl}/contact/unsubscribe`, {
      email,
    });
    return response;
  } catch (error) {
    return error;
  }
};
