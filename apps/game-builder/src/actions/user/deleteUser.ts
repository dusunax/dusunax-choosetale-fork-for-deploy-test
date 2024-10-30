import axios from "axios";
import { getCookie } from "cookies-next";
import { API_URL } from "@/config/config";

export default function deleteUser() {
  const sid = getCookie("connect.sid");
  const cookies = `connect.sid=${sid}`;
  if (!cookies) return;

  return axios.delete(`${API_URL}/user`, {
    headers: { Cookies: cookies },
  });
}
