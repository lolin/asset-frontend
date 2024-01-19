import { apiURL } from "@config/config";
import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
interface Props {
  url: any;
  method: any;
  body: any;
}
async function fetchData({ url, method, body }: Props) {
  const session = await getSession();
  const accessToken = session?.user?.accessToken || "";
  const res = await fetch(`${apiURL}/${url}`, {
    cache: "no-store",
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: body ? JSON.stringify(body) : null,
  });
  if (!res.ok) {
    if (res.status === 401) {
      signOut();
    }
    throw new Error("Failed to fetch data");
  }
  let data = null;
  method === "DELETE" ? data : (data = await res.json());
  console.log(data);
  return data;
}
export default fetchData;
