export async function GET(request: Request) {
  const response = await fetch("http://localhost:4000/userInfo", {
    cache: "no-cache",
  });
  const userInfo = await response.json();

  if (!userInfo) {
    return new Response("UserInfo not found", {
      status: 401,
    });
  }

  return Response.json({
    userInfo,
  });
}
export async function POST() {}
export async function PATCH() {}
export async function DELETE() {}
