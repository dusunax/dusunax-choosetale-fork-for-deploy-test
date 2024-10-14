import { AxiosHeaders } from "axios";
import { cookies } from "next/headers";

export default function initRequestHeader() {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");

  process.env.AUTH_KEY &&
    headers.set("authorization-jwt", process.env.AUTH_KEY);

  const oauthCookie = `${cookies().get("connect.sid")?.value}`;
  oauthCookie && headers.set("Cookie", oauthCookie);

  return headers as unknown as AxiosHeaders;
}
