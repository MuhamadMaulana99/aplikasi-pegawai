import axios from "axios";
import Cookies from "js-cookie";

const API_URL = "http://localhost:3000/api"; // Ganti jika hosting di server lain

export const registerUser = async (username, password) => {
  return axios.post(`${API_URL}/auth/register`, { username, password });
};

export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { username, password });
  const token = response.data.token;

  Cookies.set("token", token, { expires: 1 }); // Simpan token 1 hari di cookie
  return response.data;
};

export const logoutUser = () => {
  Cookies.remove("token");
};

export const getToken = () => Cookies.get("token");
