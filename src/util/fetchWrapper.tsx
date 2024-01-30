import { localApiURL } from "@config/config";
import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import { authURL } from "@config/config";
interface Props {
  url: any;
  method: any;
  body: any;
}
async function fetchData({ url, method, body }: Props) {
  const session = await getSession();
  const accessToken = session?.user?.accessToken || "";
  const res = await fetch(`${localApiURL}/${url}`, {
    cache: "no-store",
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: body ? JSON.stringify(body) : null,
  });
  // console.log(res);
  if (!res.ok) {
    if (res.status === 401) {
      signOut({ callbackUrl: `${authURL}` });
    }
    throw new Error("Failed to fetch data");
  }
  let data = null;
  method === "DELETE" ? data : (data = await res.json());
  return data;
}
export default fetchData;
