import axios from "axios";
import Cookies from "js-cookie";
console.log(process.env.NEXT_PUBLIC_API_URL, 'process.env.NEXT_PUBLIC_API_URL')


export const registerUser = async (username, password) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, { username, password });
};

export const loginUser = async (username, password) => {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { username, password });
  const token = response.data.token;

  Cookies.set("token", token, { expires: 1 }); // Simpan token 1 hari di cookie
  return response.data;
};

export const logoutUser = () => {
  Cookies.remove("token");
};

export const getToken = () => Cookies.get("token");
