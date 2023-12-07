import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, res: NextResponse) {
  const req = await request.json();
  console.log("ini 1: ", req);
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

  const url = "http://localhost:3001/users";
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
