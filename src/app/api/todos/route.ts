export async function GET() {
  const response = await fetch("http://localhost:4000/todos", {
    cache: "no-cache",
  });
  const todos: Todo[] = await response.json();

  return Response.json({
    todos,
  });
}
export async function POST(request: Request) {
  const { contents, isDone } = await request.json();
  const response = await fetch("http://localhost:4000/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contents, isDone }),
  });

  const todo = await response.json();
  return Response.json({ todo });
}
export async function PATCH() {}
export async function DELETE(request: Request) {
  const todos = await request.json();
  await Promise.all(
    todos.map(async (todo: Todo) => {
      await fetch(`http://localhost:4000/todos/${todo.id}`, {
        method: "DELETE",
      });
    })
  );

  return Response.json("삭제완료");
}
