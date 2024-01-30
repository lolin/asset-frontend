import { NextRequest, NextResponse } from "next/server";
import { apiURL } from "@config/config";
export async function POST(request: NextRequest, res: NextResponse) {
  const req = await request.json();
  const method = "POST";
  const name = req.name;
  const eamil = req.email;
  const password = req.password;
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: eamil,
      password: password,
    }),
  };

  const url = `${apiURL}/users`;
  console.log("ini", url);
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (data) {
      return data;
    }
    console.log(data);
  } catch (error) {
    console.error(error);
    // return res.status(500).json({ message: "Internal Server Error" });
  }
}
